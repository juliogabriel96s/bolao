import { makeCreatePaymentUseCase } from "@/use-cases/factories/payment/make-create-payment-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createPayment(request: FastifyRequest, reply: FastifyReply){

    const createPaymentParamsSchema = z.object({
        roundId: z.string()
    })

    const createPaymentBodySchema = z.object({
        method: z.enum(["PIX", "PROOF"]),
        amount: z.coerce.number(),
        proofUrl: z.string().optional()

    })

    const userId = request.user.sub

    const {roundId} = createPaymentParamsSchema.parse(request.params)
    const {amount, method, proofUrl} = createPaymentBodySchema.parse(request.body)

    try{
        const createPaymentUseCase = makeCreatePaymentUseCase()

        const payment = await createPaymentUseCase.execute({
            userId,
            roundId,
            method,
            amount,
            proofUrl
        })

        return reply.status(201).send({payment})
    }catch(err){
        
    }
}