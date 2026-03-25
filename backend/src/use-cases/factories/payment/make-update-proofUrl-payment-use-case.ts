import { PrismaPaymentRepository } from "@/repositories/prisma-repository/prisma-payment-repository";
import { UpdateProofUrlPaymentUseCase } from "@/use-cases/payment/update-proofUrl-paymen";

export function makeUpdateProofUrlPaymentUseCase(){
    
    const paymentRepository = new PrismaPaymentRepository()
    const useCase = new UpdateProofUrlPaymentUseCase(paymentRepository)

    return useCase

}