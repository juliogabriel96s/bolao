import { Either, right } from "@/core/either"
import { PaymentRepository } from "@/repositories/payment-repository"
import { Payment } from "@prisma/client"

interface UpdateProofUrlPaymentUseCaseRequest{
    paymentId: string
    proofUrl: string
}

type UpdateProofUrlPaymentUseCaseResponse = Either<
{},
{
    payment: Payment
}
>

export class UpdateProofUrlPaymentUseCase{
    
    constructor(private paymentRepository: PaymentRepository){}

    async execute({
       paymentId,
       proofUrl
    }:UpdateProofUrlPaymentUseCaseRequest):Promise< UpdateProofUrlPaymentUseCaseResponse>{
        const payment = await this.paymentRepository.update(paymentId, proofUrl)

        return right({
            payment
        })
    }

}