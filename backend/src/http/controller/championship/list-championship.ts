import { makeListChampionshipUseCase } from "@/use-cases/factories/championship/make-list-championship-reposiitory";
import { FastifyReply, FastifyRequest } from "fastify";

export async function listChampionship(request: FastifyRequest, reply: FastifyReply){
    try{
        const listChampionshipUseCase = makeListChampionshipUseCase()

        const championships = await listChampionshipUseCase.execute()
        
        return reply.status(200).send({championships})
    } catch(err){
        
        throw err
    }
}