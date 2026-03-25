import { PrismaPaymentRepository } from "@/repositories/prisma-repository/prisma-payment-repository";
import { CreatePaymentUseCase } from "@/use-cases/payment/create-payment";

export function makeCreatePaymentUseCase(){
    
    const paymentRepository = new PrismaPaymentRepository()
    const useCase = new CreatePaymentUseCase(paymentRepository)

    return useCase

}