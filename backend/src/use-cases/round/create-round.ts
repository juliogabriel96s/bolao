import { Either, left, right } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { ChampionshipRepository } from "@/repositories/championship-repository"
import { RoundsRepository } from "@/repositories/rounds-repository"
import { Round } from "@prisma/client"

interface CreateRoundUseCaseRequest{
    number: number
    championshipId: string
}

type CreateRoundUseCaseResponse =   Either<
NotAllowedError,
{
    round: Round
}
>

export class CreateRoundUseCase{
    constructor(
        private roundRepository: RoundsRepository,
        private championshipRepository: ChampionshipRepository
    ){}

    async execute({
        number,
        championshipId
    }: CreateRoundUseCaseRequest): Promise<CreateRoundUseCaseResponse>{
        const championship = await this.championshipRepository.findById(championshipId)

        if(!championship){
            return left(new NotAllowedError)
        }

        const roundAlreadyExist = await this.roundRepository.findByNumberOrChampionship(number, championshipId)

        if(roundAlreadyExist){
            return left(new NotAllowedError())
        }

        const round = await this.roundRepository.create({
            number,
            championshipId
        })

        return right({
            round
        })
    }
}