import { makeFindByListRoundUseCase } from "@/use-cases/factories/round/make-find-by-list-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function findByListRound(request: FastifyRequest, reply: FastifyReply){
   
    const findByListRoundParamsSchema = z.object({
        championshipId: z.coerce.string()
    })

    const {championshipId} = findByListRoundParamsSchema.parse(request.params)

    try{
        const findByListRoundUseCase = makeFindByListRoundUseCase()

        const rounds = await findByListRoundUseCase.execute({
            championshipId
        })

        return reply.status(200).send({rounds})
    } catch(err){
        throw err
    }
}