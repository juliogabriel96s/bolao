
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Register } from './pages/register/Register'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { AdminRoutes } from './routes/adminRoutes/AdminRoutes'
function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/users' element={<Register/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>

        </Routes>

        <AdminRoutes/>
    </BrowserRouter>
      
  )
}

export default App
