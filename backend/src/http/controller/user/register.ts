import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { makeRegisterUserUseCase } from "@/use-cases/factories/user/make-regiter-user-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function registerUser(request: FastifyRequest, reply: FastifyReply){

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6)
    })

    const {name, email, password} = registerBodySchema.parse(request.body)

    const registerUserUseCase = makeRegisterUserUseCase()

    const result = await registerUserUseCase.execute({
        name,
        email,
        password
    })

    if (result.isLeft()) {
        const error = result.value

        if (error instanceof NotAllowedError) {
            return reply.status(409).send({
                message: "Email already exists"
            })
        }

        return reply.status(400).send({
            message: "Erro ao cadastrar"
        })
    }

    const { user } = result.value

    return reply.status(201).send({ user })
}