import { Prisma, Game } from "@prisma/client";
import { GameRepository } from "../game-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGameRepository implements GameRepository{
    async create(data: Prisma.GameUncheckedCreateInput) {
        const game = await prisma.game.create({
            data
        })

        return game
    }

    async findByRound(roundId: string) {
        const games = await prisma.game.findMany({
            where:{
                roundId
            }
        })

        return games
    }

    async findById(gameId: string) {
        const game = await prisma.game.findUnique({
            where:{
                id: gameId
            }
        })

        return game
    }

    async updateScore(gameId: string, homeScore: number, awayScore: number) {
        const game = await prisma.game.update({
            where:{id: gameId},
            data:{
                homeScore,
                awayScore,
            }
        })

        return game
    }

    async delete(gameId: string) {
        await prisma.game.delete({
            where:{
                id: gameId
            }
        })
    }

}