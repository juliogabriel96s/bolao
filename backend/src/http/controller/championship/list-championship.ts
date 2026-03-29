import { makeListChampionshipUseCase } from "@/use-cases/factories/championship/make-list-championship-reposiitory"
import { FastifyReply, FastifyRequest } from "fastify"

export async function listChampionship(request: FastifyRequest, reply: FastifyReply){
  try{
    const listChampionshipUseCase = makeListChampionshipUseCase()

    const result = await listChampionshipUseCase.execute()

    if (result.isLeft()) {
      return reply.status(400).send()
    }

    return reply.status(200).send({
      championships: result.value.championships
    })

  } catch(err){
    throw err
  }
}