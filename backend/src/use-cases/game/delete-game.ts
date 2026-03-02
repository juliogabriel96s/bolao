import { Either, left, right } from "@/core/either"
import { ResourceNotFound } from "@/core/errors/errors/resource-not-found"
import { GameRepository } from "@/repositories/game-repository"

interface DeleteGameUseCaseRequest{
    gameId: string
}

type DeleteGameUseCaseResponse = Either<
ResourceNotFound,
{}
>

export class DeleteGameUseCase{

    constructor(private gameRepository: GameRepository){}

    async execute({
        gameId,
    }: DeleteGameUseCaseRequest): Promise<DeleteGameUseCaseResponse>{
        
        const gameNotExists = await this.gameRepository.findById(gameId)

        if(!gameNotExists){
            return left(new ResourceNotFound)
        }

        await this.gameRepository.delete(gameId)

        return right({})
    }
}