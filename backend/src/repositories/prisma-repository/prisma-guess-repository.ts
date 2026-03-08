import { Prisma } from "@prisma/client";
import { GuessRepository } from "../guesses-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGuessRepository implements GuessRepository{
    
    async findMany(gameId: string){
        const guess = await prisma.guess.findMany({
            where:{
                 gameId
            }
        })

        return guess
    }
    
   

    async updatePoints(guessId: string, points: number) {
        const guess = await prisma.guess.update({
            where:{
                id: guessId
            },
            data:{
                points
            }
        })

        return guess
    }

    async create(data: Prisma.GuessUncheckedCreateInput){
        const guess = await prisma.guess.create({
            data
        })

        return guess
    }

}