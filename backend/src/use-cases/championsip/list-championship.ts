import { Either, right } from "@/core/either";
import { ChampionshipRepository } from "@/repositories/championship-repository";
import { Championship } from "@prisma/client";

type ListChampionshipUseCaseResponse = Either<
{},
{
    championships: Championship[]
}
>

export class ListChampionship{
    constructor(private champiosipRepository: ChampionshipRepository){}

    async execute(): Promise<ListChampionshipUseCaseResponse>{
        const championships = await this.champiosipRepository.findAll()

        return right({
            championships
        });
    }
}