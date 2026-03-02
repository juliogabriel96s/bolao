import { Either, left, right } from "@/core/either"
import { ResourceNotFound } from "@/core/errors/errors/resource-not-found"
import { GameRepository } from "@/repositories/game-repository"
import { Game } from "@prisma/client"

interface ListByRoundUseCaseRequest{
    roundId: string
}

type ListByRoundUseCaseResponse = Either<
ResourceNotFound,
{
    games: Game[]
}
>

export class ListByRoundUseCase{

    constructor(private gameRepository: GameRepository){}

    async execute({
        roundId
    }: ListByRoundUseCaseRequest): Promise<ListByRoundUseCaseResponse>{

        const roundNotExists = await this.gameRepository.findById(roundId)

        if(!roundId){
            return left(new ResourceNotFound)
        }

        const games = await this.gameRepository.findByRound(roundId)

        return right({
            games
        })

    }
}