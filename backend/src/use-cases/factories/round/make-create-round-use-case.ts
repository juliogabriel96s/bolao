import { PrismaChampioshipRepository } from "@/repositories/prisma-repository/prisma-championship-repository";
import { PrismaRoundsRepository } from "@/repositories/prisma-repository/prisma-round-repository";
import { CreateRoundUseCase } from "@/use-cases/round/create-round";

export function makeCreateRoundUseCase(){
    const roundRepository = new PrismaRoundsRepository()
    const championshipRepository = new PrismaChampioshipRepository()
    const useCase = new CreateRoundUseCase(
        roundRepository,
        championshipRepository
    )

    return useCase
}