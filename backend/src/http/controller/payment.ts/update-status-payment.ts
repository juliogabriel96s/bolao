import { makeUpdateStatusPaymentUseCase } from "@/use-cases/factories/payment/make-upadte-payment-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function updateStatusPayment(request: FastifyRequest, reply: FastifyReply){

    const updateStatusPaymentParamsSchema = z.object({
        paymentId: z.string()
    })


    const {paymentId} = updateStatusPaymentParamsSchema.parse(request.params)

    try{
        const updateStatusPaymentUseCase = makeUpdateStatusPaymentUseCase()

        const payment = await updateStatusPaymentUseCase.execute({
          paymentId
        })

        return reply.status(200).send({payment})
    }catch(err){
        
    }
}