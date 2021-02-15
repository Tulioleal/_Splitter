import Link from "next/link";
import ButtonLink from "../components/ButtonLink/ButtonLink";
import styles from "../styles/Gatherings.module.scss";
import localforage from "localforage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const gatherings = () => {
  const router = useRouter();
  const [gaths, setgaths] = useState([]);

  useEffect(() => {
    (async () => {
      await localforage
        .getItem("gatherings")
        .then((data) => {
          setgaths(data);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  const navigate = (gathName, friends) =>
    router.push({
      pathname: `/results/calculate`,
      query: {
        gathName: gathName,
        friends: JSON.stringify(friends),
      },
    });

  return (
    <div className={styles.container}>
      {gaths.length == 0 ? (
        <div className={styles.container}>
          <h3 className={styles.marginB}>Oops...</h3>

          <p className={styles.marginB}>
            looks like you have no gaths... :(
          </p>

          <p className={styles.marginB}>
            Why dont try and <Link href="/newGathering">create one</Link>, then
            add some friends.
          </p>

          <ButtonLink href="/newGathering" title="New Gath" />
        </div>
      ) : (
        <>
          {gaths.map((gath, index) => (
            <Link
              href={`/results/calculate?gathName=${gath.gathName}&friends=${JSON.stringify(gath.friends)}`}
            >
              <div key={index} className={styles.gath}>
                <h3 className={styles.gathName}>{gath.gathName}</h3>
                <ul>
                  <li>
                    Friends: <span>{gath.friends.length}</span>
                  </li>
                  <li>
                    Date: <span>{gath.createdAt}</span>
                  </li>
                </ul>
              </div>
            </Link>
          ))}
          <ButtonLink
            className={styles.buttonL}
            title="New Gath"
            href="/newGathering"
          />
        </>
      )}
    </div>
  );
};

export default gatherings;
