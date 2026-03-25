import { PrismaPaymentRepository } from "@/repositories/prisma-repository/prisma-payment-repository";
import { LIstManyPaymentUseCase } from "@/use-cases/payment/list-many-payment";

export function makeListManyPaymentUseCase(){
    
    const paymentRepository = new PrismaPaymentRepository()
    const useCase = new LIstManyPaymentUseCase(paymentRepository)

    return useCase

}