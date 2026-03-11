import { PrismaBetRepository } from "@/repositories/prisma-repository/prisma-bet-repository";
import { GetUserBetUseCase } from "@/use-cases/bet/get-user-bet";

export function makeGetBetUseCase(){
    const betRepository = new PrismaBetRepository()
    const useCase = new GetUserBetUseCase(betRepository)

    return useCase
}