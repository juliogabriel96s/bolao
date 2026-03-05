import { FastifyInstance } from "fastify";
import { verifyUserRole } from "../middlewares/role-to-verify";
import { createGame } from "./create-game";
import { deleteGame } from "./delete-game";
import { editScore } from "./edit-score";
import { listByRound } from "./list-by-round";
import { verifyJWT } from "../middlewares/verify-jwt";

export async function gameRoutes(app: FastifyInstance){

    app.addHook("onRequest", verifyJWT)

    app.post("/round/:roundId/game", {onRequest:[verifyUserRole("ADMIN")]}, createGame)
    app.delete("/game/:gameId", {onRequest:[verifyUserRole("ADMIN")]}, deleteGame)
    app.put("/game/:gameId/score", {onRequest:[verifyUserRole("ADMIN")]}, editScore)
    app.get("/round/:roundId/game", listByRound)

}