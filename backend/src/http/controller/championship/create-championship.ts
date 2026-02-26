import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { makeCreateChampionshipUseCase } from "@/use-cases/factories/championship/make-create-championship-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createChampionship(request: FastifyRequest, reply: FastifyReply){
    const createChampionshipBodySchema = z.object({
        name: z.string().min(1),
        country: z.string().min(1),
        startDate: z.coerce.date(),
        endDate: z.coerce.date()
    })

    const {
        name,
        country,
        startDate,
        endDate
    } = createChampionshipBodySchema.parse(request.body)

    try{
        const createChampionshipUseCase = makeCreateChampionshipUseCase()

        const championship = await createChampionshipUseCase.execute({
            name,
            country,
            startDate,
            endDate
        })

        return reply.status(201).send({championship})
    } catch(err){
        if( err instanceof NotAllowedError){
            return reply.status(400).send({message: err.message})
        }

        throw err
    }
}