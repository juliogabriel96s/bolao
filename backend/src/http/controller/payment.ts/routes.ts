import { FastifyInstance } from "fastify"
import { verifyJWT } from "../middlewares/verify-jwt"
import { createPayment } from "./create-payment"
import { listManyPayment } from "./list-many-payments"
import { updateStatusPayment } from "./update-status-payment"
import { verifyUserRole } from "../middlewares/role-to-verify"
import { updateProofUrlPayment } from "./update-proofUrfl-payment"

export async function paymentRoutes(app: FastifyInstance){

    app.addHook("onRequest", verifyJWT)

    app.post("/payment/:roundId",createPayment)
    app.get("/payment", listManyPayment)
    app.patch("/payment/:paymentId/status",{onRequest:[verifyUserRole("ADMIN")]} , updateStatusPayment)
    app.patch("/payment/:paymentId/proofUrl" , updateProofUrlPayment)
    app.get("/round/:roundId/payment-status", listManyPayment)
}