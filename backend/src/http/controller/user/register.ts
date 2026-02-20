import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { makeRegisterUserUseCase } from "@/use-cases/factories/user/make-regiter-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z, { email } from "zod";

export async function registerUser(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6)
    })

    const {name, email, password} = registerBodySchema.parse(request.body)

    try{
        const registerUserUseCase =  makeRegisterUserUseCase()

        const user = await registerUserUseCase.execute({
            name,
            email,
            password
        })

        return reply.status(201).send({user})
    }catch(err){
        if(err instanceof NotAllowedError){
            return reply.status(409).send({message: "Email already exists"})
        }
    }
}