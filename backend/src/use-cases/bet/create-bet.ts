import { Either, left, right } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { BetRepository } from "@/repositories/bet-repository"
import { PaymentRepository } from "@/repositories/payment-repository"
import { RoundsRepository } from "@/repositories/rounds-repository"
import { Bet } from "@prisma/client"

interface CreateBetUseCaseRequest{
    userId: string,
    roundId: string,
    guesses:{
        gameId: string,
        homeScore: number,
        awayScore: number
    }[],
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
        private roundRepository: RoundsRepository,
        private paymentRepository: PaymentRepository
    ){}

    async execute({
        roundId,
        userId,
        guesses,
    }: CreateBetUseCaseRequest): Promise<CreateBetUseCaseResponse>{

        const alreadyBetExists = await this.betRepository.findByUserAndRound(roundId, userId)

        if(alreadyBetExists){
            return left(new NotAllowedError())
        }

        const findARound = await this.roundRepository.findById(roundId)

        if(!findARound?.startDate){
            return left(new NotAllowedError())
        }

        const now = new Date()

        if(now >  findARound.startDate){
            return left(new NotAllowedError())
        }

        const payment = await this.paymentRepository.findByUserAndChampioship(
            userId,
            roundId
        )

        if(!payment){
            return left(new NotAllowedError())
        }

        const paymentStatus = await this.paymentRepository.findAPayment(
            userId,
            roundId
        )

        if(paymentStatus?.status !== "APPROVED"){
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