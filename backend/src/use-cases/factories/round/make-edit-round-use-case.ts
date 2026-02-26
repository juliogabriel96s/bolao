import { PrismaRoundsRepository } from "@/repositories/prisma-repository/prisma-round-repository";
import { EditRoundUseCase } from "@/use-cases/round/edit-round";

export function makeEditRoundUseCase(){
    const roundRepository = new PrismaRoundsRepository()
    const useCase = new EditRoundUseCase(roundRepository)

    return useCase
}