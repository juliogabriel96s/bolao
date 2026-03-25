import styles from "./Login.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../components/Input/Input"
import { Button } from "../components/Button/Button"
import { useAuth } from "../hooks/UseAuth"
import jbet from "../img/jbet.jpg"


export function Login(){

    const {signIn} = useAuth()

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

     async function handleLogin() {
     try {
    setError("")
    await signIn(email, password)
    navigate("/dashboard")
  } catch (err: unknown) {
     if (err instanceof Error) {
    setError(err.message)
  } else {
    setError("Erro ao fazer logn")
  }
  }
  
  }

    return(
       <div className={styles.container}>
  <div className={styles.box}> 

    <div className={styles.lado}>
      <h1>Faça o seu login</h1>
      <h2>Se divirta-se com o nosso bolão</h2>

      <img src={jbet} alt="jbet" className={styles.jbet}/>
    </div>

    <div className={styles.card}>
      <h1>Conecte-se</h1>

      <div className={styles.form}> 
        <Input
          placeholder="E-mail"
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />

        <Button onClick={handleLogin}>
          Entrar
        </Button>

        {error && <p className={styles.error}>{error}</p>}

          <p className={styles.link}>
                  Não é cadastrado? <br /> {" "}
                  <span onClick={() => navigate("/users")}>
                    cadastre-se
                  </span>
                </p>

      </div>

    </div>

  </div>
</div>
    )
}