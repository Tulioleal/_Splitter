import styles from '../../styles/Calculate.module.scss'
import { useRouter } from 'next/router'

const calculate = () => {
    const router = useRouter()
        
    const total = () => {

    }

    return (
        <div className={styles.container}>
            <h2>{router.query.calculate}</h2>

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
