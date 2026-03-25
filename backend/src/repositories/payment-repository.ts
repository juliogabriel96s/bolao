import { Payment, Prisma } from "@prisma/client";

export interface PaymentRepository{
    create(data: Prisma.PaymentUncheckedCreateInput): Promise<Payment>
    findByUserAndChampioship(userId: string, roundId: string): Promise<Payment | null>
    aprove(paymentId: string): Promise<Payment>
    findMany(): Promise<Payment[]>
    update(paymentId: string, proofUrl: string): Promise<Payment>
    findAPayment(userId: string, roundId: string): Promise<Payment | null>
}