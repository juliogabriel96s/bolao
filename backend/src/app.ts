import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { userRoutes } from "./http/controller/user/routes";
import { championshipRoutes } from "./http/controller/championship/routes";
import { roundRoutes } from "./http/controller/round/routes";

export const app = fastify()

app.register(fastifyJwt,{
    secret: env.JWT_SECRET
})
app.register(userRoutes)
app.register(championshipRoutes)
app.register(roundRoutes)

app.setErrorHandler((error, request, reply) =>{
    if(error instanceof ZodError){
        return reply
        .status(400)
        .send({message:"Validation error", issues: error.format})
    }

    if(env.NODE_ENV !== "production"){
        console.error(error)
    } else{

    }

    return reply.status(500).send("Internal server error")
})