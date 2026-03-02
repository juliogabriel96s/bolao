import { ResourceNotFound } from "@/core/errors/errors/resource-not-found";
import { makeEditScoreUseCase } from "@/use-cases/factories/game/make-edit-score-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function editScore(request: FastifyRequest, reply: FastifyReply){
    
    const editScoreParamsSchema = z.object({
        gameId: z.coerce.string()
    })

    const editScoreBodySchema = z.object({
        homeScore: z.coerce.number(),
        awayScore: z.coerce.number(),
    })

    const {gameId} = editScoreParamsSchema.parse(request.params)
    const {homeScore, awayScore} = editScoreBodySchema.parse(request.body)

    try{
        const editScoreUseCase = makeEditScoreUseCase()

        const game = await editScoreUseCase.execute({
            gameId,
            homeScore,
            awayScore,
            
        })

        return reply.status(200).send({game})
    } catch(err){
        if(err instanceof ResourceNotFound){
            return reply.status(409).send({message: "game not found"})
        }

        throw err
    }

}