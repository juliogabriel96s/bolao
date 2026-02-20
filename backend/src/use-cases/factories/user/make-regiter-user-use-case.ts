import { PrismaUserRepository } from "@/repositories/prisma-repository/prisma-user-repository";
import { RegisterUserUseCase } from "@/use-cases/user/register";

export function makeRegisterUserUseCase(){
    const userRepository = new PrismaUserRepository()
    const useCase = new RegisterUserUseCase(userRepository)

    return useCase
}