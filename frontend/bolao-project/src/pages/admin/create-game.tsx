import styles from "./create-championship.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";
import { useState } from "react";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

export function CreateGame(){

    const {roundId} = useParams()

    const {createGames} = useAuth()

    const navigate = useNavigate()

    const [homeTeam, setHomeTeam] = useState("")
    const [awayTeam, setAwayTeam] = useState("")
    const [startDate, setStartDate] = useState<Date>(new Date)
    const [error, setError] = useState("")

     async function handleCreateGame() {
     try {
    setError("")
    await createGames( roundId!, homeTeam,  awayTeam, startDate)
    navigate("/admin/dashboard")
  } catch (err: unknown) {
     if (err instanceof Error) {
    setError(err.message)
  } else {
    setError("Erro ao criar jogo")
  }
  }
  
  }

  return(
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.introducao}>Criar Jogo</h1>

        <Input
        placeholder="Home team"
        onChange={e => setHomeTeam(e.target.value)}
        />
        
        <h3 className={styles.vs}>Vs</h3>
        
        <Input
        placeholder="Away team"
        onChange={e=> setAwayTeam(e.target.value)}
        />

        <Input
        type="date"
        value={startDate.toISOString().split("T")[0]}
        onChange={e => setStartDate(new Date(e.target.value))}
        placeholder=""
        />


        {error && <p className={styles.error}>{error}</p>}
        

        <Button onClick={handleCreateGame}>
            Adicionar jogo
        </Button>
      </div>
    
    </div>
  )
}