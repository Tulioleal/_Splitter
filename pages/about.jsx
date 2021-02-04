import Layout from '../components/Layout/Layout'
import Button from '../components/Button/Button'
import styles from '../styles/About.module.scss'

const About = () => {
    return (
        <div>
            <Layout>
                <div className={styles.container}>
                    <h2>Think less, <br/>
                    <span>Live</span> more</h2>
                    <p>
                        Splitter is a very simple to use app, created to split bills between you and your friends in a party, reunion or even trip.
                    </p>
                    <h3>One</h3>
                    <p>
                        Create a a gatheing
                    </p>
                    <h3>Two</h3>
                    <p>
                        Add your friends and what they spent .
                    </p>
                    <h3 className={styles.noBckg}>
                        That’s it.
                    </h3>
                    <Button 
                        href='/main'
                        title='New Gathering'
                    />
                </div>
            </Layout>
        </div>
    )
}

export default About
