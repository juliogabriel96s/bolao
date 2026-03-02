import { ResourceNotFound } from "@/core/errors/errors/resource-not-found";
import { makeCreateGameUseCase } from "@/use-cases/factories/game/make-create-game-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createGame(request: FastifyRequest, reply: FastifyReply){
    
    const createGameParamsSchema = z.object({
        roundId: z.coerce.string()
    })

    const createGameBodySchema = z.object({
        homeTeam: z.string(),
        awayTeam: z.string(),
        startTime: z.coerce.date()
    })

    const {roundId} = createGameParamsSchema.parse(request.params)
    const {homeTeam, awayTeam, startTime} = createGameBodySchema.parse(request.body)

    try{
        const createGameUseCase = makeCreateGameUseCase()

        const game = await createGameUseCase.execute({
            roundId,
            homeTeam,
            awayTeam,
            startTime
        })

        return reply.status(201).send({game})
    } catch(err){
        if(err instanceof ResourceNotFound){
            return reply.status(409).send({message: "round not found"})
        }

        throw err
    }

}