import { Either, right } from "@/core/either"
import { PaymentRepository } from "@/repositories/payment-repository"
import { Payment } from "@prisma/client"


type ListManyPaymentUseCaseResponse = Either<
{},
{
    payment: Payment[]
}
>

export class LIstManyPaymentUseCase{
    
    constructor(private paymentRepository: PaymentRepository){}

    async execute({}):Promise<ListManyPaymentUseCaseResponse>{
        const payment = await this.paymentRepository.findMany()

        return right({
            payment
        })
    }

}