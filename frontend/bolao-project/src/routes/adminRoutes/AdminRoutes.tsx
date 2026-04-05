import { Route, Routes } from "react-router-dom";
import { DashboardAdmin } from "../../pages/admin/DashboardAdmin";
import { CreateChampioship } from "../../pages/admin/create-championship";
import { CreateRounds } from "../../pages/admin/create-rounds";
import { CreateGame } from "../../pages/admin/create-game";
import { GetDashboardRounds } from "../../pages/admin/GetDashboardRounds";

export function AdminRoutes(){
    return(
        <Routes>
            <Route path="/dashboard" element={<DashboardAdmin/>}/>
            <Route path="/championship" element={<CreateChampioship/>}/>
            <Route path="/championship/:championshipId/round" element={<CreateRounds/>}/>
            <Route path="/round/:roundId/game" element={<CreateGame/>}/>
            <Route path="/championship/:championshipId/rounds" element={<GetDashboardRounds/>}/>
        </Routes>
    )
}