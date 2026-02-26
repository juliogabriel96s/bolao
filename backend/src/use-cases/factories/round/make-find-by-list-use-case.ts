import { PrismaRoundsRepository } from "@/repositories/prisma-repository/prisma-round-repository";
import { FindByListRoundUseCase } from "@/use-cases/round/find-by-list";

export function makeFindByListRoundUseCase(){
    const roundRepository = new PrismaRoundsRepository()
    const useCase = new FindByListRoundUseCase(roundRepository)

    return useCase
}