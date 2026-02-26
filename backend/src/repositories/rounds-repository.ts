import { Prisma, Round } from "@prisma/client";

export interface RoundsRepository{
    create(data: Prisma.RoundUncheckedCreateInput):Promise<Round>
    findById(id: string): Promise<Round | null>
    findByNumberOrChampionship(number: number, championshipId: string):Promise<Round | null>
    findByChampionship(championshipId: string): Promise<Round[]>
    update(number: number, id: string): Promise<Round>
    delete(id: string): Promise<void>
    hasGame(id: string): Promise<boolean>
}