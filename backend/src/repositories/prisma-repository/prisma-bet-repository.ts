import { Prisma} from "@prisma/client";
import { BetRepository, RankingItem } from "../bet-repository";
import { prisma } from "@/lib/prisma";

export class PrismaBetRepository implements BetRepository{
   
   async findByUser(userId: string) {
        const bet = await prisma.bet.findMany({
            where:{
                userId
            },
            include:{
                round:{
                    include:{
                        championship: true
                    }
                },
                guesses:{
                    include:{
                        game: true
                    }
                },
            
            },
            orderBy:{
                createdAt: "desc"
            }
        }) 

        return bet
    }

    async getRanking() {
        const bets = await prisma.bet.findMany({
      include: {
        user: true
      }
    })

    const rankingMap: Record<string, RankingItem> = {}

    for (const bet of bets) {

      if (!rankingMap[bet.userId]) {
        rankingMap[bet.userId] = {
          userId: bet.userId,
          name: bet.user.name,
          points: 0
        }
      }

      rankingMap[bet.userId].points += bet.totalPts
    }

    const ranking = Object.values(rankingMap)

    ranking.sort((a, b) => b.points - a.points)

    return ranking
    
    }
    
    
   async create(data: Prisma.BetUncheckedCreateInput) {
        const bet = await prisma.bet.create({
            data
        })

        return bet;
    }

    async findByUserAndRound(userId: string, roundId: string){
        const bet = prisma.bet.findUnique({
            where:{
                userId_roundId:{
                    userId,
                    roundId
                }
            }
        })

        return bet
    }

    async updateBet(betId: string, totalPoints: number){
        const bet = await prisma.bet.update({
            where:{
                id: betId
            },
            data:{
                totalPts: totalPoints,
            }
        })

        return bet
    }

    async findByRound(roundId: string){
        const bet = await prisma.bet.findMany({
            where:{
                roundId
            },
            include:{
                user: true
            },
            orderBy:{
                totalPts: "desc"
            }
        })

        return bet
    }

}