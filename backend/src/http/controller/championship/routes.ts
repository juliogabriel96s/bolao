import { FastifyInstance } from "fastify";
import { createChampionship } from "./create-championship";
import { listChampionship } from "./list-championship";
import { verifyJWT } from "../middlewares/verify-jwt";
import { verifyUserRole } from "../middlewares/role-to-verify";

export async function championshipRoutes(app: FastifyInstance){
    
    app.addHook("onRequest", verifyJWT)

    app.post("/championship",{onRequest: [verifyUserRole("ADMIN")]} ,createChampionship)
    app.get("/championship", listChampionship)
}