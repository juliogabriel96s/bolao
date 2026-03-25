import { PrismaBetRepository } from "@/repositories/prisma-repository/prisma-bet-repository";
import { PrismaPaymentRepository } from "@/repositories/prisma-repository/prisma-payment-repository";
import { PrismaRoundsRepository } from "@/repositories/prisma-repository/prisma-round-repository";
import { CreateBetUseCase } from "@/use-cases/bet/create-bet";

export function makeCreateBetUseCase(){
    const betRepository = new PrismaBetRepository()
    const roundRepository = new PrismaRoundsRepository()
    const paymentRepository = new PrismaPaymentRepository()
    const useCase = new CreateBetUseCase(
        betRepository,
        roundRepository,
        paymentRepository
    )

    return useCase
}