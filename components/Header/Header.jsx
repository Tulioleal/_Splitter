import Link from 'next/link'
import styles from './Header.module.scss'

const Header = () => {
    return (
        <div className={styles.container}>
            <img
                src="/Splitter.png"
                alt="Splitter logo"
                className={styles.logo}
            />
            <Link href='/'>
                <h1>SPLITTER</h1>
            </Link>
        </div>
    )
}

export default Header
