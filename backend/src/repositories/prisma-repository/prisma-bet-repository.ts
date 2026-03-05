import { Prisma, Bet } from "@prisma/client";
import { BetRepository } from "../bet-repository";
import { prisma } from "@/lib/prisma";

export class PrismaBetRepository implements BetRepository{
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

}