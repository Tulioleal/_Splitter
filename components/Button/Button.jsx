import Link from 'next/link'
import styles from './Button.module.scss'

const Button = ({ title, href }) => {
    return (
        <Link
            href={href}
        >
            <button className={styles.btn}>
                {title}
            </button>
        </Link>
    )
}

export default Button
