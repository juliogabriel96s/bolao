export function useAuth(){

 async function signIn(email: string, password: string) {
  const response = await fetch("http://localhost:3333/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Email ou senha inválidos");
  }
  
  localStorage.setItem("token", data.token);

  return data;
}

async function signUp(name: string, email: string, password: string) {
  const response = await fetch("http://localhost:3333/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao cadastrar");
  }

  console.log("STATUS:", response.status)
  console.log("DATA:", data)

  return data;
}



  async function createChampionship(name: string, country: string, startDate: Date, endDate: Date){

    const token = localStorage.getItem("token")

    const response =  await fetch("http://localhost:3333/championship",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({name, country, startDate: startDate.toISOString(),
      endDate: endDate.toISOString()})
      
    })

    
    const data = await response.json();

    if (!response.ok) {
     throw new Error(data.message || "Erro ao criar campeonato");
    }

    return data;
    }

  async function createRounds(number: number, championshipId: string, startDate: Date, endDate: Date ){

    const token = localStorage.getItem("token")

    const response = await fetch(`http://localhost:3333/championship/${championshipId}/round`,{
      method: "POST",
       headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({number, startDate: startDate.toISOString(),
      endDate: endDate.toISOString()}),
      })

        
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro ao criar Rounds");
    }

    return data;
    }

  async function createGames(roundId:string, homeTeam: string, awayTeam: string, startDate: Date) {

        const token = localStorage.getItem("token")

    const response = await fetch(`http://localhost:3333/round/${roundId}/game`,{
       method: "POST",
       headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
       body: JSON.stringify({homeTeam, awayTeam, startDate: startDate.toISOString()}),
      })

        
      const data = await response.json();

     if (!response.ok) {
       throw new Error(data.message || "Erro ao criar Games");
     }

       return data;
    }

  function signOut() {
  localStorage.removeItem("token");
}

    return { signIn, signUp, signOut, createChampionship, createRounds, createGames }
  
}