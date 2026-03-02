import { PrismaGameRepository } from "@/repositories/prisma-repository/prisma-game-repository";
import { EditScoresUseCase } from "@/use-cases/game/edit-score";

export function makeEditScoreUseCase(){

    const gameRepository = new PrismaGameRepository()
    
    const useCase = new EditScoresUseCase(
        gameRepository
    )

    return useCase
}