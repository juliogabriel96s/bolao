import { Either, left, right } from "@/core/either"
import { ResourceNotFound } from "@/core/errors/errors/resource-not-found"
import { UserRepository } from "@/repositories/user-repositories"
import { User } from "@prisma/client"
import { compare } from "bcryptjs"

interface AuthenticateUserUseCaseRequest{
    email: string
    password: string
}

type AuthenticateUserUseCaseResponse = Either<
ResourceNotFound,
{
    user: User
}
>

export class AuthenticateUserUseCase{
    constructor(private userRepository: UserRepository){}

    async execute({
        email,
        password
    }:AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse>{
        const user = await this.userRepository.findByEmail(email)

        if(!user){
            return left(new ResourceNotFound())
        }

        const comparePassword = await compare(password, user.password_hash)

        if(!comparePassword){
            return left(new ResourceNotFound())
        }

        return right({
            user
        })
        }
}