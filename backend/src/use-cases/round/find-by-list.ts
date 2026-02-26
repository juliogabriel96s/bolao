import { Either, right } from "@/core/either";
import { RoundsRepository } from "@/repositories/rounds-repository";
import { Round } from "@prisma/client";

interface FindByListRoundUseCaseRequest{
    championshipId: string
}

type FindByListRoundUseCaseResponse = Either<
{},
{
    rounds: Round[]
}
>

export class FindByListRoundUseCase{
    constructor(private roundRepository: RoundsRepository){}

    async execute({
        championshipId
    }: FindByListRoundUseCaseRequest):Promise<FindByListRoundUseCaseResponse>{
        const rounds = await this.roundRepository.findByChampionship(championshipId)

        return right({
            rounds
        })
    }
}