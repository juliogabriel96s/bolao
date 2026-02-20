import { Either, left, right } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { UserRepository } from "@/repositories/user-repositories"
import { User } from "@prisma/client"
import { hash } from "bcryptjs"

interface RegisterUserUseCaseRequest{
    name: string
    email: string
    password: string
}

type RegisterUserUseCaseResponse = Either<
NotAllowedError,
{
    user: User
}
>

export class RegisterUserUseCase{
    constructor(private userRepository: UserRepository){}

    async execute({
        name,
        email,
        password
    }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse>{
        const password_hash = await hash(password, 6)

        const emailAlreadyExists = await this.userRepository.findByEmail(email)

        if(emailAlreadyExists) {
            return left(new NotAllowedError())
        }

        const user = await this.userRepository.create({
            name,
            email,
            password_hash
        })

        return right({
            user
        })

    }
}