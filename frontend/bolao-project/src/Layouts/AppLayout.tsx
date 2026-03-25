import type { ReactNode } from "react"
import styles from "./AppLayout.module.css"

interface AppLayoutProps{
    children: ReactNode
}

export function AppLayout({children}: AppLayoutProps){
    return(
        <div className={styles.container}>
            <header className={styles.header}>
                Bolão App
            </header>
            <main className={styles.content}>
                {children}
            </main>
        </div>
    )
}