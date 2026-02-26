import { Game, Prisma } from "@prisma/client";

export interface GameRepository{
    create(data: Prisma.GameUncheckedCreateInput):Promise<Game>
    findByRound(roundId: string): Promise<Game[]>
    findById(gameId: string): Promise<Game | null>
    updateScore(gameId: string, homeScore: number, awayScore: number): Promise<Game>
    delete(gameId: string): Promise<void>
}