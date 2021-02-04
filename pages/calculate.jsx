import styles from '../styles/Calculate.module.scss'

const calculate = () => {
    return (
        <div className={styles.container}>
            <h2>Gathering name</h2>

            <div className={styles.results}>
                <h3>Total</h3>
                <span>asxz</span>
            </div>

            <div className={styles.results}>
                <h3>Each<br/>Friend</h3>
                <span>sac</span>
            </div>

            <h3 className={styles.title}>Results</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta alias quidem nihil ex, aspernatur odit?</p>
        </div>
    )
}

export default calculate
