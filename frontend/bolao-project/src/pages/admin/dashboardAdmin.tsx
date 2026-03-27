import styles from "./DashboardAdmin.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";

export function DashboardAdmin(){
    const navigate = useNavigate()

    const {roundId} = useParams()
    const {championshipId} = useParams()

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
        </div>
        </div>
        
     
    )
}