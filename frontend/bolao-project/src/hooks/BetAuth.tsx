import type { Bet } from "../types/Bet"

export function BetAuth(){
    async function createBet(roundId:string,  bets: Bet[]) {
        const token = localStorage.getItem("token")

      const response = await fetch(`http://localhost:3333/round/${roundId}/bet`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({bets})
      
    })

      
    const data = await response.json();

     if (!response.ok) {
     throw new Error(data.message || "Erro ao criar a aposta");
   }

   return data;

    }

    return {createBet}
}