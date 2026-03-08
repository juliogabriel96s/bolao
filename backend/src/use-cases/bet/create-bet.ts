import { Either, left, right } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { BetRepository } from "@/repositories/bet-repository"
import { GameRepository } from "@/repositories/game-repository"
import { Bet } from "@prisma/client"

interface CreateBetUseCaseRequest{
    userId: string,
    roundId: string,
    guesses:{
        gameId: string,
        homeScore: number,
        awayScore: number
    }[]
}

type CreateBetUseCaseResponse = Either<
NotAllowedError,
{
    bet: Bet
}
>

export class CreateBetUseCase{
    constructor(
        private betRepository: BetRepository,
        private gameRepository: GameRepository
    ){}

    async execute({
        roundId,
        userId,
        guesses
    }: CreateBetUseCaseRequest): Promise<CreateBetUseCaseResponse>{

        const alreadyBetExists = await this.betRepository.findByUserAndRound(roundId, userId)

        if(alreadyBetExists){
            return left(new NotAllowedError())
        }

        const firstGame = await this.gameRepository.findFistGame(roundId)

        if(!firstGame){
            return left(new NotAllowedError())
        }

        const now = new Date()

        if(now >  firstGame.startTime){
            return left(new NotAllowedError())
        }

        const bet = await this.betRepository.create({
            roundId,
            userId,
            guesses:{
                create: guesses.map(g => ({
                    gameId: g.gameId,
                    homeScore: g.homeScore,
                    awayScore: g.awayScore
                }))
            }
        })

        return right({
            bet
        })

    }
}