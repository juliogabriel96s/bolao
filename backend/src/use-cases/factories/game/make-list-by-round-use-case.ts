import { PrismaGameRepository } from "@/repositories/prisma-repository/prisma-game-repository";
import { ListByRoundUseCase } from "@/use-cases/game/list-by-round";

export function makeListByRoundGameUseCase(){

    const gameRepository = new PrismaGameRepository()
    
    const useCase = new ListByRoundUseCase(
        gameRepository
    )

    return useCase
}