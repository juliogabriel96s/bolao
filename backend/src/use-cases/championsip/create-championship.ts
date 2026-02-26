import { Either, left, right } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { ChampionshipRepository } from "@/repositories/championship-repository"
import { Championship } from "@prisma/client"

interface CreateChampionshipUseCaseRequest{
    name: string
    country: string
    startDate: Date
    endDate: Date
}

type CreateChampionshipUseCaseResponse = Either<
NotAllowedError,
{
    championship: Championship
}
>

export class CreateChampionshipUseCase{
    constructor(private championshpRepository: ChampionshipRepository){}

    async execute({
        name,
        country,
        startDate,
        endDate
    }: CreateChampionshipUseCaseRequest): Promise<CreateChampionshipUseCaseResponse>{
        const nameAlareadyExists = await this.championshpRepository.findByName(name)

        if(nameAlareadyExists){
            return left(new NotAllowedError())
        }

        if(startDate >= endDate){
            return left(new NotAllowedError())
        }

        const championship = await this.championshpRepository.create({
            name,
            country,
            startDate,
            endDate
        })

        return right({
            championship
        })
    }
}
