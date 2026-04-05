import styles from "./create-championship.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";
import { useState } from "react";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

export function CreateRounds(){

    const {championshipId} = useParams()

    const {createRounds} = useAuth()

    const navigate = useNavigate()

    const [number, setNumber] = useState("")
    const [startDate, setStartDate] = useState<Date>(new Date)
    const [endDate, setEndDate] = useState<Date>(new Date)
    const [error, setError] = useState("")

     async function handleCreateRounds() {
     try {
    setError("")
    await createRounds(Number(number), championshipId!, startDate, endDate)
    navigate("/admin/round/:roundId/game")
  } catch (err: unknown) {
     if (err instanceof Error) {
    setError(err.message)
  } else {
    setError("Erro ao criar rodada")
  }
  }
  
  }

  return(
    <div className={styles.container}>
      <div className={styles.box}>
        <h1>Atualize Rodada</h1>

        <Input
        type="number"
        placeholder="numero da rodada"
        value={number}
        onChange={e => setNumber(e.target.value)}
        />

    
        <Input
        type="date"
        value={startDate.toISOString().split("T")[0]}
        onChange={e => setStartDate(new Date(e.target.value))}
        placeholder=""
        />

        <Input
        type="date"
        value={endDate.toISOString().split("T")[0]}
        onChange={e => setEndDate(new Date(e.target.value))}
        placeholder=""
        />

        {error && <p className={styles.error}>{error}</p>}
        

        <Button onClick={handleCreateRounds}>
            Criar Rodada
        </Button>
      </div>
    
    </div>
  )
}