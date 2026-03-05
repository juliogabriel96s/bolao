export function calculoBet(
    homeScoreGame: number,
    awayScoreGame: number,
    homeScoreBet: number,
    awayScoreBet: number
): number{

    if (homeScoreGame === homeScoreBet && awayScoreGame === awayScoreBet){
        return 10;
    }

    const resultBet = getResult(homeScoreBet, awayScoreBet)
    const resultCorrect = getResult(homeScoreGame, awayScoreGame)

    if(resultBet === resultCorrect){
        return 5;
    }

    return 0;
}

function getResult(home: number, away: number){
    if(home > away) return "Home"
    if(home < away) return "Away"
    return "Drawn"
    
}