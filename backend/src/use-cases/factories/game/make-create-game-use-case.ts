import { PrismaGameRepository } from "@/repositories/prisma-repository/prisma-game-repository";
import { PrismaRoundsRepository } from "@/repositories/prisma-repository/prisma-round-repository";
import { CreateGameUsecase } from "@/use-cases/game/create-game";

export function makeCreateGameUseCase(){

    const roundRepository = new PrismaRoundsRepository() 
    const gameRepository = new PrismaGameRepository()
    
    const useCase = new CreateGameUsecase(
        roundRepository,
        gameRepository
    )

    return useCase
}