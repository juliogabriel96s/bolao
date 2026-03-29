import { ResourceNotFound } from "@/core/errors/errors/resource-not-found";
import { makeListByRoundGameUseCase } from "@/use-cases/factories/game/make-list-by-round-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function listByRound(request: FastifyRequest, reply: FastifyReply){
    
    const listByRoundParamsSchema = z.object({
        roundId: z.coerce.string()
    })



    const {roundId} =listByRoundParamsSchema.parse(request.params)

    try{
        const listByRoundUseCase = makeListByRoundGameUseCase()

        const result = await listByRoundUseCase.execute({
             roundId
        })

         if (result.isLeft()) {
         return reply.status(400).send()
         }

        return reply.status(200).send({
          games: result.value.games
        })

    } catch(err){
        if(err instanceof ResourceNotFound){
            return reply.status(409).send({message: "game not found"})
        }

        throw err
    }

}