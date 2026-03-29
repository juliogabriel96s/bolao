
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Register } from './pages/register/Register'
import { AdminRoutes } from './routes/adminRoutes/AdminRoutes'
import { BetsRoutes } from './routes/betsRoutes/BetRoutes'
function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/users' element={<Register/>}/>
            <Route path='/admin/*' element={<AdminRoutes />} />
            <Route path='/bets/*' element={<BetsRoutes />} />
        </Routes>
    </BrowserRouter>
      
  )
}

export default App
