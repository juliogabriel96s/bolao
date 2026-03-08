import { makeGetRoundTableUseCase } from "@/use-cases/factories/bet/make-get-round-table-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getRoundTable(request: FastifyRequest, reply: FastifyReply){
    const getRoundTableUseCase = makeGetRoundTableUseCase()

    const ranking = await getRoundTableUseCase.execute()

    return reply.status(200).send({ranking})
}