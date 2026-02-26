import { Either, left, right } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { RoundsRepository } from "@/repositories/rounds-repository"
import { Round } from "@prisma/client"

interface EditRoundUseCaseRequest{
    roundId: string
    number: number
}

type EditRoundUseCaseResponse = Either<
NotAllowedError,
{
    round: Round
}
>

export class EditRoundUseCase{
    constructor(private roundRepository: RoundsRepository){}

    async execute({
        roundId,
        number
    }:EditRoundUseCaseRequest): Promise<EditRoundUseCaseResponse>{
        const round = await this.roundRepository.findById(roundId)

        if(!round){
            return left(new NotAllowedError)
        }

        round.number = number

        await this.roundRepository.update(number, round.id)

        return right({round})
    }
}