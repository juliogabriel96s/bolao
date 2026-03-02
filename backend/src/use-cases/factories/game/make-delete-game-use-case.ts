import { PrismaGameRepository } from "@/repositories/prisma-repository/prisma-game-repository";
import { DeleteGameUseCase } from "@/use-cases/game/delete-game";

export function makeDeleteGameUseCase(){

    const gameRepository = new PrismaGameRepository()
    
    const useCase = new DeleteGameUseCase(
        gameRepository
    )

    return useCase
}