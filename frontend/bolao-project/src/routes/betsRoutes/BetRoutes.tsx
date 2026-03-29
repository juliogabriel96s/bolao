import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../../pages/Dashboard/Dashboard";
import { DashboardChampionships } from "../../pages/Dashboard/DashBoardChampioship";
import { DashboardRounds } from "../../pages/Dashboard/DashboardRounds";

export function BetsRoutes(){
    return(
        <Routes>
            <Route path="round/:roundId/game" element={<Dashboard/>}/>
            <Route path="championship" element={<DashboardChampionships/>}/>
            <Route path="championship/:championshipId/rounds" element={<DashboardRounds/>}/>
        </Routes>
    )
}