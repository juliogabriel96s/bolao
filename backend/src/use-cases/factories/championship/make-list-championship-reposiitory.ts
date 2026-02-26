import { PrismaChampioshipRepository } from "@/repositories/prisma-repository/prisma-championship-repository";
import { ListChampionship } from "@/use-cases/championsip/list-championship";

export function makeListChampionshipUseCase(){
    const championshipRepository = new PrismaChampioshipRepository()
    const useCase = new ListChampionship(championshipRepository)

    return useCase
}