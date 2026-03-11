import { Either, right } from "@/core/either";
import { ResourceNotFound } from "@/core/errors/errors/resource-not-found";
import { BetRepository } from "@/repositories/bet-repository";
import { Bet } from "@prisma/client";

interface GetUserBetUseCaseRequest{
    userId: string
}

type GetUserBetUseCaseResponse = Either<
{},
{
    bets: Bet[]
}
>


export class GetUserBetUseCase{
    constructor(private betRepository: BetRepository){}

    async execute({
        userId  
    }: GetUserBetUseCaseRequest): Promise<GetUserBetUseCaseResponse>{
        const bets = await this.betRepository.findByUser(userId)

        return right({
            bets
        })
    }
}