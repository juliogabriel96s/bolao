export function useAuth(){

 async function signIn(email: string, password: string) {
  const response = await fetch("http://localhost:3333/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  
  localStorage.setItem("token", data.token);

  return data;
}

  async function signUp(name: string, email: string, password: string) {
    return fetch("http://localhost:3333/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then(res => res.json())
  }



  async function createChampionship(name: string, country: string, startDate: Date, endDate: Date){

    const token = localStorage.getItem("token")

    return fetch("http://localhost:3333/championship",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({name, country, startDate: startDate.toISOString(),
      endDate: endDate.toISOString()})
      
    }).then(res => res.json())
  }

  async function createRounds(number: number, championshipId: string, startDate: Date, endDate: Date ){

    const token = localStorage.getItem("token")

    return fetch(`http://localhost:3333/championship/${championshipId}/round`,{
      method: "POST",
       headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({number, startDate: startDate.toISOString(),
      endDate: endDate.toISOString()}),
      })
  }

  async function createGames(roundId:string, homeTeam: string, awayTeam: string, startDate: Date) {

        const token = localStorage.getItem("token")

    return fetch(`http://localhost:3333/round/${roundId}/game`,{
       method: "POST",
       headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
       body: JSON.stringify({homeTeam, awayTeam, startDate: startDate.toISOString()}),
      })
  }

    return { signIn, signUp, createChampionship, createRounds, createGames }
  
}