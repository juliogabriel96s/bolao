import { PrismaPaymentRepository } from "@/repositories/prisma-repository/prisma-payment-repository";
import { UpdateStatusPaymentUseCase } from "@/use-cases/payment/update-status-payment";

export function makeUpdateStatusPaymentUseCase(){
    
    const paymentRepository = new PrismaPaymentRepository()
    const useCase = new UpdateStatusPaymentUseCase(paymentRepository)

    return useCase

}