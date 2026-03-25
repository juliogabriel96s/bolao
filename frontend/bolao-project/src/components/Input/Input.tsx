import type React from "react"
import styles from "./input.module.css"

interface Props{
    placeholder: string
    type?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: string
}

export function Input({placeholder, type, onChange, value}: Props){
   return(
    <input
    className={styles.input}
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={onChange}
    ></input>
   ) 
}