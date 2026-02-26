import { Either, left, right } from "@/core/either"
import { ResourceNotFound } from "@/core/errors/errors/resource-not-found"
import { RoundsRepository } from "@/repositories/rounds-repository"
import { Round } from "@prisma/client"

interface GetRoundUseCaseRequest{
    roundId: string
}

type GetRoundUseCaseResponse = Either<
ResourceNotFound,
{
    round: Round
}
>

export class GetRoundUseCase{
    constructor(private roundRepository: RoundsRepository){}

    async execute({
        roundId
    }:GetRoundUseCaseRequest): Promise<GetRoundUseCaseResponse>{
        const round = await this.roundRepository.findById(roundId)

        if(!round){
            return left(new ResourceNotFound)
        }


        return right({round})
    }
}