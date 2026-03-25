import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";
import { useState } from "react";
import { Input } from "../../components/Input/Input";

export function CreateChampioship(){

    const {createChampionship} = useAuth()

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [country, setCountry] = useState("")
    const [startDate, setStartDate] = useState<Date>(new Date)
    const [endDate, setEndDate] = useState<Date>(new Date)
    const [error, setError] = useState("")

     async function handleCreateChampionship() {
     try {
    setError("")
    await createChampionship(name, country, startDate, endDate)
    navigate("/admin/dashboard")
  } catch (err: unknown) {
     if (err instanceof Error) {
    setError(err.message)
  } else {
    setError("Erro ao criar campeonato")
  }
  }
  
  }

  return(
    <div className={styles.container}>
      <div className={styles.box}>
        <h1>Atualize o campeonato</h1>

        <Input
        placeholder="nome do campeonato"
        onChange={e => setName(e.target.value)}
        />

        <Input
        placeholder="País"
        onChange={e=> setCountry(e.target.value)}
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
      </div>
    
    </div>
  )
}