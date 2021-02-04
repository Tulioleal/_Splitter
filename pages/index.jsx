import ButtonLink from '../components/ButtonLink/ButtonLink'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
      <div className={styles.container}>
        <h2>Welcome</h2>
        <p>
          The magic of Splitter is that we <span>think</span> so you don’t have to.
        </p>
        <ButtonLink
          href='/about'
          title='About te App'
        />
        <ButtonLink 
          href='/gatherings'
          title='Your Gatherings'
        />
        <ButtonLink 
          href='/newGathering'
          title='New Gathering'
        />
      </div>
  )
}
