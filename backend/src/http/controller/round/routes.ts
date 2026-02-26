import { FastifyInstance } from "fastify";
import { createRound } from "./create-round";
import { verifyJWT } from "../middlewares/verify-jwt";
import { verifyUserRole } from "../middlewares/role-to-verify";
import { deleteRound } from "./delete-round";
import { editRound } from "./edit-round";
import { findByListRound } from "./find-by-list";
import { getByIdRound } from "./get-by-id";

export async function roundRoutes(app: FastifyInstance){

    app.addHook("onRequest", verifyJWT)

    app.post("/championship/:championshipId/round",{onRequest:[verifyUserRole("ADMIN")]}, createRound)
    app.delete("/round/:roundId", {onRequest:[verifyUserRole("ADMIN")]}, deleteRound)
    app.put("/round/:roundId", {onRequest:[verifyUserRole("ADMIN")]}, editRound)
    app.get("/championship/:championshipId/round", findByListRound)
    app.get("/round/:roundId", getByIdRound)

}