import { makeListManyPaymentUseCase } from "@/use-cases/factories/payment/make-list-many-payments.-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function listManyPayment(request: FastifyRequest, reply: FastifyReply){

    try{
        const listManyPaymentUseCase = makeListManyPaymentUseCase()

        const payment = await listManyPaymentUseCase.execute({})

        return reply.status(200).send({payment})
    }catch(err){
        
    }
}