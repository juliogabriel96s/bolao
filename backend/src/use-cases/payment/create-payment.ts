import { Either, right } from "@/core/either"
import { PaymentRepository } from "@/repositories/payment-repository"
import { Payment } from "@prisma/client"

interface CreatePaymentUseCaseRequest{
    userId: string
    roundId: string
    method: "PIX" | "PROOF"
    proofUrl?: string 
    amount: number;
}

type CreatePaymentUseCaseResponse = Either<
{},
{
    payment: Payment
}
>

export class CreatePaymentUseCase{
    
    constructor(private paymentRepository: PaymentRepository){}

    async execute({
        userId,
        roundId,
        method,
        proofUrl,
        amount
    }:CreatePaymentUseCaseRequest):Promise< CreatePaymentUseCaseResponse>{
        const payment = await this.paymentRepository.create({
            userId,
            roundId,
            method,
            proofUrl,
            amount
        })

        return right({
            payment
        })
    }

}