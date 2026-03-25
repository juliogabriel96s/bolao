import { Either, left, right } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { PaymentRepository } from "@/repositories/payment-repository"
import { Payment } from "@prisma/client"

interface FindAPaymentAManyPaymentUseCaseRequest{
    userId: string,
    roundId: string
}

type FindAPaymentAManyPaymentUseCaseResponse = Either<
NotAllowedError,
{
    payment: Payment
}
>

export class FindAPaymentUseCase{
    
    constructor(private paymentRepository: PaymentRepository){}

    async execute({
        userId,
        roundId
    }:FindAPaymentAManyPaymentUseCaseRequest):Promise<FindAPaymentAManyPaymentUseCaseResponse>{
        const payment = await this.paymentRepository.findAPayment(userId, roundId)

        if(!payment){
            return left(new NotAllowedError())
        }

        if(payment.status !== "APPROVED"){
            return left(new NotAllowedError())
        }

        return right({
            payment
        })
    }

}