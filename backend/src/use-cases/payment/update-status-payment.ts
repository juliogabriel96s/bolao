import { Either, right } from "@/core/either"
import { PaymentRepository } from "@/repositories/payment-repository"
import { Payment } from "@prisma/client"

interface UpdateStatusPaymentUseCaseRequest{
    paymentId: string
}

type UpdateStatusPaymentUseCaseResponse = Either<
{},
{
    payment: Payment
}
>

export class UpdateStatusPaymentUseCase{
    
    constructor(private paymentRepository: PaymentRepository){}

    async execute({
       paymentId
    }:UpdateStatusPaymentUseCaseRequest):Promise< UpdateStatusPaymentUseCaseResponse>{
        const payment = await this.paymentRepository.aprove(paymentId)

        return right({
            payment
        })
    }

}