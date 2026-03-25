import { PrismaPaymentRepository } from "@/repositories/prisma-repository/prisma-payment-repository";
import { FindAPaymentUseCase } from "@/use-cases/payment/find-a-payment";

export function makeFindAPaymentUseCase(){
    
    const paymentRepository = new PrismaPaymentRepository()
    const useCase = new FindAPaymentUseCase(paymentRepository)

    return useCase

}