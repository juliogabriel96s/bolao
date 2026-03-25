import { useNavigate } from "react-router-dom"

export function Dashboard(){

  const navigate = useNavigate()

  function handleLogout(){
    localStorage.removeItem("token")

    navigate("/sessions")
  }

  return(
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <button onClick={handleLogout}>
        Sair
      </button>
    </div>
  )
}