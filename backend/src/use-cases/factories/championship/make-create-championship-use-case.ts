import { PrismaChampioshipRepository } from "@/repositories/prisma-repository/prisma-championship-repository";
import { CreateChampionshipUseCase } from "@/use-cases/championsip/create-championship";

export function makeCreateChampionshipUseCase(){
    const championshipRepository = new PrismaChampioshipRepository()
    const useCase = new CreateChampionshipUseCase(championshipRepository)

    return useCase
}