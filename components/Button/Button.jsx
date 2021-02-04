import styles from './Button.module.scss'

const Button = ({ title, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={styles.btn}>
            {title}
        </button>
    )
}

export default Button
