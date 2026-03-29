import styles from "./Dashboard.module.css"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BetAuth } from "../../hooks/BetAuth";
import type { Game } from "../../types/Games";
import type { Bet } from "../../types/Bet";
import { useAuth } from "../../hooks/UseAuth";


export function Dashboard() {
  const { roundId } = useParams();
  const { createBet } = BetAuth();
  const {signOut} = useAuth()
  const navigate = useNavigate();


  const [games, setGames] = useState<Game[]>([]);
  const [bets, setBets] = useState<Bet[]>([]);
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadGames() {
      try {
        
       const token = localStorage.getItem("token");


        const response = await fetch(
       `http://localhost:3333/round/${roundId}/game`,
       {
        headers: {
         Authorization: `Bearer ${token}`,
       },
           }
      )     

        const data = await response.json();


       setGames(data.games);
      } catch (err: unknown) {
     if (err instanceof Error) {
    setError(err.message)
  } else {
    setError("Erro ao fazer a aposta")
  }
  }
    }

    loadGames();
  }, [roundId]);

  function handleChange(
    gameId: string,
    field: "home" | "away",
    value: number
  ) {
    setBets(prev => {
      const existing = prev.find(b => b.gameId === gameId);

      if (existing) {
        return prev.map(b =>
          b.gameId === gameId
            ? {
                ...b,
                homeScore: field === "home" ? value : b.homeScore,
                awayScore: field === "away" ? value : b.awayScore,
              }
            : b
        );
      }

      return [
        ...prev,
        {
          gameId,
          homeScore: field === "home" ? value : 0,
          awayScore: field === "away" ? value : 0,
        },
      ];
    });
  }

    function handleLogout() {
    signOut();
    navigate("/"); 
  }


  async function handleSave() {
    if (!roundId) return;

    try {
      await createBet(roundId, bets);
      alert("Palpites salvos!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar");
    }
  }

  return (
    <div className={styles.container}>
      <h1>Jogos da Rodada</h1>

      {games.map(game => (
        <div
        className={styles.jogos}
          key={game.id}
          
        >
          <p>
            {game.homeTeam} vs {game.awayTeam}
          </p>

          <small>
            {new Date(game.startTime).toLocaleString()}
          </small>

          <div className={styles.games} >
            <input className={styles.placar}
              type="number"
              min={0}
              placeholder="0"
              onChange={e =>
                handleChange(game.id, "home", Number(e.target.value))
              }
            />

            <span className={styles.span} >x</span>

            <input
            className={styles.placar}
              type="number"
              min={0}
              placeholder="0"
              onChange={e =>
                handleChange(game.id, "away", Number(e.target.value))
              }
            />
          </div>
        </div>
      ))}

      {error && <p className={styles.error}>{error}</p>}

      <button
      className={styles.button}
        onClick={handleSave}
      >
        Salvar palpites
      </button>

    <button className={styles.buttonLogout} onClick={handleLogout}>
      Sair
    </button>
      
    </div>
  );
}