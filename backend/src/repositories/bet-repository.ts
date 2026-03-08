import { Bet, Prisma } from "@prisma/client";

export interface BetRepository{
    create(data: Prisma.BetUncheckedCreateInput): Promise<Bet>
    findByUserAndRound(userId: string, roundId: string): Promise<Bet | null>
    updateBet(betId: string ,totalPoints: number): Promise<Bet>
    findByRound(roundId: string): Promise<Bet[]>
    getRanking(): Promise<RankingItem[]>
}

export interface RankingItem{
    userId: string
    name: string
    points: number
}