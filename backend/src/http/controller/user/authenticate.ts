import { ResourceNotFound } from "@/core/errors/errors/resource-not-found"
import { makeAuthenticateUserUseCase } from "@/use-cases/factories/user/make-authenticate-user-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function authenticateUser(request: FastifyRequest, reply: FastifyReply) {

    const authenticateBodySchema = z.object({
        email: z.string(),
        password: z.string()
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    const authenticateUserUseCase = makeAuthenticateUserUseCase()

    const result = await authenticateUserUseCase.execute({
        email,
        password
    })

    if (result.isLeft()) {
        const error = result.value

        if (error instanceof ResourceNotFound) {
            return reply.status(401).send({ message: "Email ou senha inválidos" })
        }

        return reply.status(400).send({ message: "An error ocurred" })
    }

    const { user } = result.value

    const token = await reply.jwtSign(
        { role: user.role },
        {
            sign: {
                sub: String(user.id)
            }
        }
    )

    return reply.status(200).send({ token })
}