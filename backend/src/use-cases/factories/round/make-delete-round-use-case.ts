import { PrismaRoundsRepository } from "@/repositories/prisma-repository/prisma-round-repository";
import { DeleteRoundUseCase } from "@/use-cases/round/delete-round";

export function makeDeleteRoundUseCase(){
    const roundRepository = new PrismaRoundsRepository()
    const useCase = new DeleteRoundUseCase(roundRepository)

    return useCase
}