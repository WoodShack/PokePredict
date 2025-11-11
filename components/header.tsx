import styles from '../styles/header.module.css'
import Image from "next/image";

export default function Header() {
    return (
        <header className={styles.header}>
            <Image src={'PokePredict/logo.png'} alt={'Logo'} width={'500'} height={'100'} className={styles.logo} />
        </header>
    )
}