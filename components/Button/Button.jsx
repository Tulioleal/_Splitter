import styles from './Button.module.scss'

const Button = ({ title, onClick, type }) => {
    return (
        <button
            onClick={onClick}
            className={styles.btn}
            type={type}
        >
            {title}
        </button>
    )
}

Button.defaultProps = {
    type: 'button'
}

export default Button
