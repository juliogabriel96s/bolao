import { ResourceNotFound } from "@/core/errors/errors/resource-not-found";
import { makeFindByListRoundUseCase } from "@/use-cases/factories/round/make-find-by-list-use-case";
import { makeGetByIdRoundUseCase } from "@/use-cases/factories/round/make-get-by-id-round-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getByIdRound(request: FastifyRequest, reply: FastifyReply){
   
    const getByIdRoundParamsSchema = z.object({
        roundId: z.coerce.string()
    })

    const {roundId} = getByIdRoundParamsSchema.parse(request.params)

    try{
        const getByIdRoundUseCase = makeGetByIdRoundUseCase()

        const round = await getByIdRoundUseCase.execute({
            roundId
        })

        return reply.status(200).send({round})
    } catch(err){
        if(err instanceof ResourceNotFound){
            return reply.status(409).send({message: err.message})
        }

        throw err
    }
}