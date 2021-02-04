import Layout from '../components/Layout/Layout'
import Button from '../components/Button/Button'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div>
      <Layout>
        <div className={styles.container}>
          <h2>Welcome</h2>
          <p>
            The magic of Splitter is that we <span>think</span> so you don’t have to.
          </p>
          <Button
            href='/about'
            title='About te App'
          />
          <Button 
            href='/main'
            title='New Gathering'
          />
        </div>
      </Layout>
    </div>
  )
}
