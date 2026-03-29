import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Round } from "../../types/Round";

export function DashboardRounds() {
  const { championshipId } = useParams();
  const navigate = useNavigate();

  const [rounds, setRounds] = useState<Round[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRounds() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:3333/championship/${championshipId}/round`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        console.log(data);

        setRounds(data.rounds); 
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro ao buscar rodadas");
        }
      }
    }

    loadRounds();
  }, [championshipId]);

  return (
    <div>
      <h1>Rodadas</h1>

      {error && <p>{error}</p>}

      {rounds.length === 0 && <p>Nenhuma rodada encontrada</p>}

      {rounds.map((round) => (
        <div key={round.id}>
          <p>Rodada {round.number}</p>

          <button
            onClick={() =>
              navigate(`/bets/round/${round.id}/game`)
            }
          >
            Ver jogos
          </button>
        </div>
      ))}
    </div>
  );
}