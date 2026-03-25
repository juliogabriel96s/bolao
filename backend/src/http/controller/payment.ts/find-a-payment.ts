import { makeCreatePaymentUseCase } from "@/use-cases/factories/payment/make-create-payment-use-case";
import { makeFindAPaymentUseCase } from "@/use-cases/factories/payment/make-find-a-payment-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function findAPayment(request: FastifyRequest, reply: FastifyReply){

    const findAPaymentParamsSchema = z.object({
        roundId: z.string()
    })

    const userId = request.user.sub

    const {roundId} = findAPaymentParamsSchema.parse(request.params)

    try{
        const findAPaymentUseCase = makeFindAPaymentUseCase()

        const payment = await findAPaymentUseCase.execute({
            userId,
            roundId,
        })

        return reply.status(201).send({payment})
    }catch(err){
        
    }
}