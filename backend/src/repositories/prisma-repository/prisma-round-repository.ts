import { Prisma, Round } from "@prisma/client";
import { RoundsRepository } from "../rounds-repository";
import { prisma } from "@/lib/prisma";

export class PrismaRoundsRepository implements RoundsRepository{
    async create(data: Prisma.RoundUncheckedCreateInput){
        const round = await prisma.round.create({
            data
        })

        return round
    }
   

    async findById(id: string) {
        const round = await prisma.round.findUnique({
            where:{
                id
            }
        })

        return round
    }

    async findByNumberOrChampionship(number: number, championshipId: string) {
        const round = await prisma.round.findFirst({
            where:{
                number,
                championshipId
            }
        })

        return round
    }

    async findByChampionship(championshipId: string) {
        const rounds = await prisma.round.findMany({
            where:{championshipId},
            orderBy:{number: "asc"}
        })

        return rounds
    }
    
    async update(number: number, id: string) {
        const round = await prisma.round.update({
            where:{id},
            data:{number}
        })

        return round
    }

    async delete(id: string) {
        await prisma.round.delete({
            where:{
                id
            }
        })
    }

   async hasGame(id: string) {
        const count = await prisma.game.count({
            where:{roundId: id}
        }) 

        return count > 0
    }

}