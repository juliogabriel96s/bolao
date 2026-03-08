import { PrismaBetRepository } from "@/repositories/prisma-repository/prisma-bet-repository";
import { GetRoundTableUseCase } from "@/use-cases/bet/get-round-table-use-case";

export function makeGetRoundTableUseCase(){
    const betRepository = new PrismaBetRepository()
    const useCase = new GetRoundTableUseCase(betRepository)

    return useCase
}