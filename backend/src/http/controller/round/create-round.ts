import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { makeCreateRoundUseCase } from "@/use-cases/factories/round/make-create-round-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createRound(request: FastifyRequest, reply: FastifyReply){
    const createRoundBodySchema = z.object({
        number: z.coerce.number()
    })

    const createRoundParamsSchema = z.object({
        championshipId: z.coerce.string() 
    })

    const {number} = createRoundBodySchema.parse(request.body)
    const {championshipId} = createRoundParamsSchema.parse(request.params)

    try{
        const createRoundUseCase = makeCreateRoundUseCase()

        const round = await createRoundUseCase.execute({
            number,
            championshipId
        })

        return reply.status(201).send({round})
    } catch(err){
        if(err instanceof NotAllowedError){
            return reply.status(401).send({message: err.message})
        }
    }
}