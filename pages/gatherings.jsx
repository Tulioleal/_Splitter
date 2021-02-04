import Link from 'next/link'
import ButtonLink from '../components/ButtonLink/ButtonLink'
import styles from '../styles/Gatherings.module.scss'

const gatherings = () => {
    return (
        <div className={styles.container}>

            <h3 className={styles.marginB}>
                Oops...
            </h3>

            <p className={styles.marginB} >
                looks like you have no gatherings... :(
            </p>

            <p className={styles.marginB}>
                Why dont try and <Link href='/newGathering'>create one</Link>, then add some friends.
            </p>

            <ButtonLink 
                href='/newGathering'
                title='New Gathering'
            />

        </div>
    )
}

export default gatherings
