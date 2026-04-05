import styles from "./DashboardAdmin.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { useEffect, useState } from "react";
import type { Championship } from "../../types/Champioship";

export function DashboardAdmin(){
    const navigate = useNavigate()
      const [championships, setChampionships] = useState<Championship[]>([]);
      const [error, setError] = useState("")

    const {roundId} = useParams()
    const {championshipId} = useParams()

    
      useEffect(() => {
      async function load() {
        try {
          const token = localStorage.getItem("token");
    
          const res = await fetch("http://localhost:3333/championship", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          const data = await res.json();
    
          console.log(data); 
        setChampionships(data?.championships || data || []);
        } catch (err: unknown) {
         if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Erro ao fazer a aposta")
      }
      }
      }
    
      load();
    }, []);

    return(
        <div className={styles.container}>
            <div className={styles.box}>
               <h1>Admin</h1>

         <Button onClick={() => navigate("/admin/championship")}>
            Criar campeonato
         </Button>

           <Button onClick={() => navigate(`/championship/${championshipId}/round`)}>
            Criar rodada
         </Button>

          <Button onClick={() => navigate(`/round/${roundId}/game`)}>
            Criar jogo
         </Button>  
         
          <h1>Campeonatos</h1>

       {error && <p className={styles.error}>{error}</p>}

      {championships.map(c => (
        <div key={c.id}>
          <p className={styles.paragrafo}>{c.name}</p>

          <Button
            onClick={() =>
              navigate(`/admin/championship/${c.id}/round`)
            }
          >
            Ver rodadas
          </Button>
        </div>
      ))}

         
        </div>
        </div>
        
     
    )
}