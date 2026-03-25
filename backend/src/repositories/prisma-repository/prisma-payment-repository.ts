import { Prisma, Payment } from "@prisma/client";
import { PaymentRepository } from "../payment-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPaymentRepository implements PaymentRepository{
   
  
    async create(data: Prisma.PaymentUncheckedCreateInput) {
        const payment = await prisma.payment.create({
            data
        }) 

        return payment
    }

    async findByUserAndChampioship(userId: string, roundId: string) {
        const payment = await prisma.payment.findFirst({
            where:{
                userId,
                roundId
            }
        })    

        return payment
    }

    async aprove(paymentId: string) {
        const payment = await prisma.payment.update({
            where:{
                id: paymentId
            },
            data:{
                status: "APPROVED"
            }
        })

        return payment
    }

    async findMany() {
        const payment = await prisma.payment.findMany({
            include:{
                user: true,
                round: true
            }
        })

        return payment;
    }

    async update(paymentId: string, proofUrl: string){
        const payment = await prisma.payment.update({
            where:{
                id: paymentId
            },
            data:{
                proofUrl
            }
        })

        return payment
    }

    async findAPayment(userId: string, roundId: string) {
        const payment = await prisma.payment.findFirst({
            where:{
               userId,
               roundId
            }
        })

        return payment
    }

}