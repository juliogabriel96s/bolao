import { Route, Routes } from "react-router-dom";
import { DashboardAdmin } from "../../pages/admin/DashboardAdmin";
import { CreateChampioship } from "../../pages/admin/create-championship";
import { CreateRounds } from "../../pages/admin/create-rounds";
import { CreateGame } from "../../pages/admin/create-game";

export function AdminRoutes(){
    return(
        <Routes>
            <Route path="/dashboard" element={<DashboardAdmin/>}/>
            <Route path="/championship" element={<CreateChampioship/>}/>
            <Route path="/championship/:championshipId/round" element={<CreateRounds/>}/>
            <Route path="/round/:roundId/game" element={<CreateGame/>}/>

        </Routes>
    )
}