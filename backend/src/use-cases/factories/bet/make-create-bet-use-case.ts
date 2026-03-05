import { PrismaBetRepository } from "@/repositories/prisma-repository/prisma-bet-repository";
import { CreateBetUseCase } from "@/use-cases/bet/create-bet";

export function makeCreateBetUseCase(){
    const betRepository = new PrismaBetRepository()
    const useCase = new CreateBetUseCase(betRepository)

    return useCase
}