import { Championship, Prisma } from "@prisma/client";

export interface ChampionshipRepository{
    create(data: Prisma.ChampionshipCreateInput):Promise<Championship>
    findByName(name: string): Promise<Championship | null>
    findAll():Promise<Championship[]>
    findById(id: string): Promise<Championship | null>
}