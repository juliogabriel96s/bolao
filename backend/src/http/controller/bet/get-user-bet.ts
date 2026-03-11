import { makeGetBetUseCase } from "@/use-cases/factories/bet/make-get-user-bet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getUserBet(request: FastifyRequest, reply: FastifyReply){

    const userId = request.user.sub

    const getUserBetUseCase = makeGetBetUseCase()

    const bets = await getUserBetUseCase.execute({userId})

    return reply.status(200).send({bets})
}