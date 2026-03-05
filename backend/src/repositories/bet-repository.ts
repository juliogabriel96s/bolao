import { Bet, Prisma } from "@prisma/client";

export interface BetRepository{
    create(data: Prisma.BetUncheckedCreateInput): Promise<Bet>
    findByUserAndRound(userId: string, roundId: string): Promise<Bet | null>
}