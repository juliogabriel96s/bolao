import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { makeCreateBetUseCase } from "@/use-cases/factories/bet/make-create-bet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createBet(request: FastifyRequest, reply: FastifyReply){
    const createBetBodySchema = z.object({
        guesses: z.array(
            z.object({
                gameId: z.string(),
                homeScore: z.number(),
                awayScore: z.number()
            })
        )
    })

    const createBetParamsSchema = z.object({
        roundId: z.string(),
    })

    const { guesses } = createBetBodySchema.parse(request.body)
    const {roundId} = createBetParamsSchema.parse(request.params)

    const userId = request.user.sub

    try{
        const createBetUseCase = makeCreateBetUseCase()

        const bet = await createBetUseCase.execute({
            userId,
            roundId,
            guesses
        })

        return reply.status(201).send({bet})
    } catch(err){
        if( err instanceof NotAllowedError){
            return reply.status(400).send({message: err.message})
        }

        throw err
    }
}