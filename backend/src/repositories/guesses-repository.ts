import { Game, Guess, Prisma } from "@prisma/client";

export interface GuessRepository{
  findMany(gameId: string): Promise<Guess[]>
  updatePoints(guessId: string, points: number): Promise<Guess>
  create( data: Prisma.GuessUncheckedCreateInput): Promise<Guess>
}