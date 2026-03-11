import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { createBet } from "./create-bet";
import { getRoundTable } from "./get-round-table";

export async function betRoutes(app: FastifyInstance){
    
    app.addHook("onRequest", verifyJWT)

    app.post("/round/:roundId/bet", createBet)
    app.get("/round/bet", getRoundTable)
    app.get("/me/round/bet", getRoundTable)

}