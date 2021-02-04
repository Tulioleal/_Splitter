import Link from 'next/link'
import styles from './Header.module.scss'

const Header = () => {
    return (
        <div className={styles.container}>
            
            <Link href='/'>
                <h1>SPLITTER</h1>
            </Link>
        </div>
    )
}

export default Header
