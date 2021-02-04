import Link from 'next/link'
import styles from './ButtonLink.module.scss'

const ButtonLink = ({ title, href }) => {
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

export default ButtonLink
