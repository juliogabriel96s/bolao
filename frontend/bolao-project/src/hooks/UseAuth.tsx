export function useAuth(){

  async function signIn(email: string, password: string) {
    return fetch("http://localhost:3333/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(res => res.json())
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
    return fetch("http://localhost:3333/championship",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, country, startDate, endDate})
      
    }).then(res => res.json())
  }

    return { signIn, signUp, createChampionship }
  
}