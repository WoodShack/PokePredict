import styles from '../styles/header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <img src={'/logo.png'} alt={'Logo'} className={styles.logo} />
        </header>
    )
}