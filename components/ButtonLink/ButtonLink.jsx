import Link from 'next/link'
import styles from './ButtonLink.module.scss'

const ButtonLink = ({ title, href, type }) => {
    return (
        <Link
            href={href}
        >
            <button type={type} className={styles.btn}>
                {title}
            </button>
        </Link>
    )
}

export default ButtonLink
