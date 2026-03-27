import styles from "./Register.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../../components/Input/Input"
import { Button } from "../../components/Button/Button"
import { useAuth } from "../../hooks/UseAuth"


export function Register(){

    const {signUp} = useAuth()

    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

     async function handleRegister() {
         try {
    setError("")
    await signUp(name, email, password)
    navigate("/sessions")
  } catch (err: unknown) {
     if (err instanceof Error) {
    setError(err.message)
  } else {
    setError("Erro ao cadastrar")
  }
  }
  }

    return(
       <div className={styles.container}>

        <h1>Cadastre-se:</h1>
        <div className={styles.form}>
                <Input 
                placeholder="Nome"
                onChange={e=> setName(e.target.value)}
                />

                 <Input 
                placeholder="Email"
                onChange={e=> setEmail(e.target.value)}
                />

                 <Input 
                placeholder="Senha"
                onChange={e=> setPassword(e.target.value)}
                />

                <Button onClick={handleRegister}>
                    Criar conta
                </Button>

                {error && <p className={styles.error}>{error}</p>}

                <p className={styles.link}>
                  já tem conta?{" "}
                  <span onClick={() => navigate("/")}>
                    Entrar
                  </span>
                </p>
        </div>

       </div>
    )
}