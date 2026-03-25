import { makeUpdateProofUrlPaymentUseCase } from "@/use-cases/factories/payment/make-update-proofUrl-payment-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function updateProofUrlPayment(request: FastifyRequest, reply: FastifyReply){

    const updateStatusPaymentParamsSchema = z.object({
        paymentId: z.string()
    })

        const updateStatusPaymentBodySchema = z.object({
        proofUrl: z.string().url()
    })

    const {paymentId} = updateStatusPaymentParamsSchema.parse(request.params)
    const {proofUrl} = updateStatusPaymentBodySchema.parse(request.body)

    try{
        const updateProofUrlPaymentUseCase = makeUpdateProofUrlPaymentUseCase()

        const payment = await updateProofUrlPaymentUseCase.execute({
          paymentId,
          proofUrl
        })

        return reply.status(200).send({payment})
    }catch(err){
        
    }
}