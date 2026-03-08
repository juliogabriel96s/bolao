import { PrismaBetRepository } from "@/repositories/prisma-repository/prisma-bet-repository";
import { PrismaGameRepository } from "@/repositories/prisma-repository/prisma-game-repository";
import { CreateBetUseCase } from "@/use-cases/bet/create-bet";

export function makeCreateBetUseCase(){
    const betRepository = new PrismaBetRepository()
    const gameRepository = new PrismaGameRepository()
    const useCase = new CreateBetUseCase(
        betRepository,
        gameRepository
    )

    return useCase
}