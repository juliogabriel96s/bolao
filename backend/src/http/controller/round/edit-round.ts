import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { makeEditRoundUseCase } from "@/use-cases/factories/round/make-edit-round-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function editRound(request: FastifyRequest, reply: FastifyReply){
   
    const editRoundBodySchema = z.object({
        number: z.number()
    })

    const editRoundParamsSchema = z.object({
        roundId: z.coerce.string()
    })

    const {number} = editRoundBodySchema.parse(request.body)
    const {roundId} = editRoundParamsSchema.parse(request.params)

    try{
        const editRoundUseCase = makeEditRoundUseCase()

        const round = await editRoundUseCase.execute({
            roundId,
            number
        })

        return reply.status(200).send({round})
    } catch(err){
        if(err instanceof NotAllowedError){
            return reply.status(409).send({message: err.message})
        }

        throw err
    }
}