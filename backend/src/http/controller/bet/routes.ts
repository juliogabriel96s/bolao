import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { createBet } from "./create-bet";

export async function betRoutes(app: FastifyInstance){
    
    app.addHook("onRequest", verifyJWT)

    app.post("/round/:roundId/bet", createBet)
}