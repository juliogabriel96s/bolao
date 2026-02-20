import { PrismaUserRepository } from "@/repositories/prisma-repository/prisma-user-repository";
import { AuthenticateUserUseCase } from "@/use-cases/user/authenticate";

export function makeAuthenticateUserUseCase(){
    const userRepository = new PrismaUserRepository()
    const useCase = new AuthenticateUserUseCase(userRepository)

    return useCase
}