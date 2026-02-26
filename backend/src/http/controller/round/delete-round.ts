import { ResourceNotFound } from "@/core/errors/errors/resource-not-found";
import { makeDeleteRoundUseCase } from "@/use-cases/factories/round/make-delete-round-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function deleteRound(request: FastifyRequest, reply: FastifyReply){
    const deleteRoundParamsSchema = z.object({
        roundId: z.coerce.string()
    })

    const {roundId} = deleteRoundParamsSchema.parse(request.params)

    try{
        const deleteRoundUseCase = makeDeleteRoundUseCase()

        await deleteRoundUseCase.execute({
            roundId
        })

        return reply.status(204).send({})
    } catch(err){
        if(err instanceof ResourceNotFound){
            return reply.status(409).send({message: err.message})
        }

        throw err
    }
}