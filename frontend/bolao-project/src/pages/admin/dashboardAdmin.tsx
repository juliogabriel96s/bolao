import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";

export function DashboardAdmin(){
    const navigate = useNavigate()

    return(
        <div>
               <h1>Admin</h1>

         <Button onClick={() => navigate("/admin/championship")}>
            Criar campeonato
         </Button>

           <Button onClick={() => navigate("/admin/round")}>
            Criar rodada
         </Button>

          <Button onClick={() => navigate("/admin/game")}>
            Criar jogo
         </Button>  
        </div>
     
    )
}