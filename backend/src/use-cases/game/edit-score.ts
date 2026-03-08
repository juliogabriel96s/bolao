import { Either, left, right } from "@/core/either"
import { ResourceNotFound } from "@/core/errors/errors/resource-not-found"
import { calculoBet } from "@/domain/calculo-bet"
import { BetRepository } from "@/repositories/bet-repository"
import { GameRepository } from "@/repositories/game-repository"
import { GuessRepository } from "@/repositories/guesses-repository"
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

    constructor(
        private gameRepository: GameRepository,
        private betRepository: BetRepository,
        private guessRepository: GuessRepository
    ){}

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

        const guesses = await this.guessRepository.findMany(gameId)

        for (const guess of guesses){

            const calculoPoints = calculoBet(
                guess.homeScore,
                guess.awayScore,
                homeScore,
                awayScore
            )

            await this.guessRepository.updatePoints(
                guess.id,
                calculoPoints
            )

            const betGuess = await this.guessRepository.findMany(gameId)
            
            const points = betGuess.reduce(
                (sum, g) => sum + g.points,
                0
            )

            await this.betRepository.updateBet(
                guess.betId,
                points
            )
        
        }

        return right({
            game
        })
    }
}