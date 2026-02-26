import { PrismaRoundsRepository } from "@/repositories/prisma-repository/prisma-round-repository";
import { GetRoundUseCase } from "@/use-cases/round/get-by-id";

export function makeGetByIdRoundUseCase(){
    const roundRepository = new PrismaRoundsRepository()
    const useCase = new GetRoundUseCase(roundRepository)

    return useCase
}