import { Either, left, right } from "@/core/either"
import { ResourceNotFound } from "@/core/errors/errors/resource-not-found"
import { GameRepository } from "@/repositories/game-repository"
import { RoundsRepository } from "@/repositories/rounds-repository"
import { Game } from "@prisma/client"

interface CreateGameUsecaseRequest{
    roundId: string
    homeTeam: string
    awayTeam: string
    startTime: Date
}

type CreateGameUsecaseResponse = Either<
ResourceNotFound,
{
    game: Game
}
>

export class CreateGameUsecase{
    
    constructor(
        private roundRepository: RoundsRepository,
        private gameRepository: GameRepository
    ){}

    async execute({
        roundId,
        homeTeam,
        awayTeam,
        startTime
    }:CreateGameUsecaseRequest): Promise<CreateGameUsecaseResponse>{
        
        const roundNotExist = await this.roundRepository.findById(roundId)

        if(!roundNotExist){
            return left(new ResourceNotFound)
        }

        const game = await  this.gameRepository.create({
            roundId,
            homeTeam,
            awayTeam,
            startTime
        })

        return right({
            game
        })
    }
}