import { Prisma, Championship } from "@prisma/client";
import { ChampionshipRepository } from "../championship-repository";
import { prisma } from "@/lib/prisma";

export class PrismaChampioshipRepository implements ChampionshipRepository{

    async create(data: Prisma.ChampionshipCreateInput){
        const championship = await prisma.championship.create({
            data
        })

        return championship
    }

     async findByName(name: string) {
        const championship = await prisma.championship.findFirst({
            where:{
                name
            }
        })

        return championship
    }
    
    async findAll() {
        return prisma.championship.findMany()
    }
    async findById(id: string){
        const championship = await prisma.championship.findUnique({
            where:{
                id
            }
        })

        return championship
    }

}