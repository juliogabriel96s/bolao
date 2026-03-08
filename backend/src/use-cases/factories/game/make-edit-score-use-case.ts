import { PrismaBetRepository } from "@/repositories/prisma-repository/prisma-bet-repository";
import { PrismaGameRepository } from "@/repositories/prisma-repository/prisma-game-repository";
import { PrismaGuessRepository } from "@/repositories/prisma-repository/prisma-guess-repository";
import { EditScoresUseCase } from "@/use-cases/game/edit-score";

export function makeEditScoreUseCase(){

    const gameRepository = new PrismaGameRepository()
    const betRepository = new PrismaBetRepository()
    const guessRepository = new PrismaGuessRepository()
    
    const useCase = new EditScoresUseCase(
        gameRepository,
        betRepository,
        guessRepository
    )

    return useCase
}