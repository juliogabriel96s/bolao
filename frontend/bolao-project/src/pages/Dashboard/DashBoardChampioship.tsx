import styles from "./DashboardChampionship.module.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Championship } from "../../types/Champioship";


export function DashboardChampionships() {
  const [championships, setChampionships] = useState<Championship[]>([]);
  const [error, setError] = useState("")
  const navigate = useNavigate();

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

  return (
    <div className={styles.container}>

      <div className={styles.box}>
           <h1>Campeonatos</h1>

       {error && <p className={styles.error}>{error}</p>}

      {championships.map(c => (
        <div key={c.id}>
          <p className={styles.paragrafo}>{c.name}</p>

          <button
            onClick={() =>
              navigate(`/bets/championship/${c.id}/rounds`)
            }

            className={styles.button}
          >
            Ver rodadas
          </button>
        </div>
      ))}
      </div>
   
    </div>
  );
}