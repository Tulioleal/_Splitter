import ButtonLink from '../components/ButtonLink/ButtonLink'
import styles from '../styles/Home.module.scss'

export default function Home() {

  return (
      <div className={styles.container}>
        <h2>Welcome</h2>
        <p>
          The magic of <span>Splitter</span> is that we <span>think</span> so you don’t have to.
        </p>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <ButtonLink
              href='/about'
              title='About te App'
            />
          </div>
          <div className={styles.button}>            
            <ButtonLink 
              href='/gatherings'
              title='Your Gatherings'
            />
          </div>
          <div className={styles.button}>
            <ButtonLink 
              href='/newGathering'
              title='New Gathering'
            />
          </div>
        </div>
    </div>
  )
}
