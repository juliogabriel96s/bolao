import { BetRepository } from "@/repositories/bet-repository";


export class GetRoundTableUseCase{
    constructor(private betRepository: BetRepository){}

    async execute(){
        const bets = await this.betRepository.getRanking()

        return bets
    }
}