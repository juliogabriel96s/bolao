import { ResourceNotFound } from "@/core/errors/errors/resource-not-found";
import { makeDeleteGameUseCase } from "@/use-cases/factories/game/make-delete-game-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function deleteGame(request: FastifyRequest, reply: FastifyReply){
    
    const deleteGameParamsSchema = z.object({
        gameId: z.coerce.string()
    })

 

    const {gameId} = deleteGameParamsSchema.parse(request.params)

    try{
        const deleteGameUseCase = makeDeleteGameUseCase()

          await deleteGameUseCase.execute({
            gameId
        })

        return reply.status(204).send({})
    } catch(err){
        if(err instanceof ResourceNotFound){
            return reply.status(409).send({message: "game not found"})
        }

        throw err
    }

}