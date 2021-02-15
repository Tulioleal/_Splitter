import ButtonLink from "../components/ButtonLink/ButtonLink";
import styles from "../styles/About.module.scss";

const About = () => {
  return (
    <div className={styles.container}>
      <h2>
        Think less, <br />
        <span>Live</span> more.
      </h2>
      <p>
        Splitter is a very simple to use app, created to split bills between you
        and your friends in a party or reunion even a trip.
      </p>
      <h3>One</h3>
      <p>Create a gath.</p>
      <h3>Two</h3>
      <p>Add your friends and how much they spent.</p>
      <h3 className={styles.noBckg}>That’s it.</h3>
      <div className={styles.buttons}>
        <div className={styles.button}>
          <ButtonLink href="/gatherings" title="Your Gaths" />
        </div>
        <div className={styles.button}>
          <ButtonLink href="/newGathering" title="New Gath" />
        </div>
      </div>
    </div>
  );
};

export default About;
