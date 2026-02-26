import { Either, left, right } from "@/core/either"
import { ResourceNotFound } from "@/core/errors/errors/resource-not-found"
import { RoundsRepository } from "@/repositories/rounds-repository"

interface DeleteRoundUseCaseRequest{
    roundId: string
}

type DeleteRoundUseCaseResponse = Either<
ResourceNotFound,
{}
>

export class DeleteRoundUseCase{
    constructor(private roundRepository: RoundsRepository){}

    async execute({
        roundId
    }:DeleteRoundUseCaseRequest): Promise<DeleteRoundUseCaseResponse>{
        const round = await this.roundRepository.findById(roundId)

        if(!round){
            return left(new ResourceNotFound)
        }

        await this.roundRepository.delete(roundId)

        return right({})
    }
}