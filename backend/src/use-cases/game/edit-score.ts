import { Either, left, right } from "@/core/either"
import { ResourceNotFound } from "@/core/errors/errors/resource-not-found"
import { GameRepository } from "@/repositories/game-repository"
import { Game } from "@prisma/client"

interface EditScoresUseCaseRequest{
    gameId: string
    homeScore: number
    awayScore: number
}

type EditScoresUseCaseResponse = Either<
ResourceNotFound,
{
    game: Game
}
>

export class EditScoresUseCase{

    constructor(private gameRepository: GameRepository){}

    async execute({
        gameId,
        homeScore,
        awayScore
    }: EditScoresUseCaseRequest): Promise<EditScoresUseCaseResponse>{
        
        const gameNotExists = await this.gameRepository.findById(gameId)

        if(!gameNotExists){
            return left(new ResourceNotFound)
        }

        const game = await this.gameRepository.updateScore(
            gameId,
            homeScore,
            awayScore
        )

        return right({
            game
        })
    }
}