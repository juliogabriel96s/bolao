import type { Bet } from "../types/Bet"

export function BetAuth(){
    async function createBet(roundId:string,  bets: Bet[]) {
        const token = localStorage.getItem("token")

        return fetch(`http://localhost:3333/round/${roundId}/bet`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({bets})
      
    }).then(res => res.json())

    }

    return {createBet}
}