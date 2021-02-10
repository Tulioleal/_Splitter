import styles from "../../styles/Calculate.module.scss";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Button from '../../components/Button/Button'
import ButtonLink from '../../components/ButtonLink/ButtonLink'
import localforage from "localforage";

const calculate = () => {
  const router = useRouter();

  const [count, setCount] = useState(0);

  const [task, settask] = useState({});

  const [friends, setFriends] = useState([]);

  const [results, setResults] = useState([]);

  const total = (gath) => {
    let total = 0;
    gath.friends.forEach(
      (element) => (total = total + parseFloat(element.amount))
    );
    gath.total = total;
  };

  const eachFriend = (gath) => {
    let each = gath.total / parseFloat(gath.friends.length);
    gath.each = each.toFixed(2);
  };

  const sortAndSet = (gath) => {
    let friends = gath.friends.sort((a, b) => {
      if (parseInt(a.amount) > parseInt(b.amount)) {
        return -1;
      }
      if (parseInt(a.amount) < parseInt(b.amount)) {
        return 1;
      }
      return 0;
    });

    friends.map((friend) => {
      friend.amount = parseInt(friend.amount) - parseFloat(gath.each);
    });

    setFriends(friends);
  };

  const compareResults = () => {

    const negFnc = (friends.filter( friend => friend.amount < 0)).reverse()
    const posFnc = friends.filter( friend => friend.amount > 0);
    
    const arr = [];

    let neg1 = [].concat(negFnc)
    let pos1= [].concat(posFnc)

    for (let i = 0; i < pos1.length; i++) {
      let num = 0;

      while (pos1[i].amount > 0) {
        if (neg1[num]) {
          let res = parseFloat((pos1[i].amount + neg1[num].amount).toFixed(2));

          if (res > 0) {
            neg1[num].amount != 0 &&
              arr.push(`${neg1[num].name} pays ${(neg1[num].amount * -1).toFixed(2)} to ${pos1[i].name}`);
            pos1[i].amount = res;
            neg1[num].amount = 0;
            num++;
            console.log(res, 1)
          } else if (res < 0) {
            pos1[i].amount != 0 &&
              arr.push(`${neg1[num].name} pays ${pos1[i].amount.toFixed(2)} to ${pos1[i].name}`);
            pos1[i].amount = 0;
            neg1[num].amount = res;
            console.log(res, 2)
          } else {
            pos1[i].amount != 0 &&
              arr.push(`${neg1[num].name} pays ${pos1[i].amount.toFixed(2)} to ${pos1[i].name}`);
            pos1[i].amount = 0;
            neg1[num].amount = 0;
            console.log(res, 3)
          }
        } else {
          return;
        }
      }
    }
    setResults(arr);
    console.log(arr, count)
  };

  useEffect(() => {
    try {
      localforage.getItem(router.query.gathName).then((returnedGath) => {
        if (returnedGath === null) {
          return router.push({ pathname: `/newGathering` });
        } else {
          total(returnedGath);
          eachFriend(returnedGath);
          settask(returnedGath);
          sortAndSet(returnedGath);
          compareResults()
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const cls = () => {
    if (count == 0) {
      compareResults()
      setCount(1)
    } else {
      return
    }
   }

  return (
    <div className={styles.container}>
      <h2>{router.query.gathName}</h2>

      <div className={styles.results}>
        <h3>Total</h3>
        <span>{task.total}</span>
      </div>

      <div className={styles.results}>
        <h3>
          Each
          <br />
          Friend
        </h3>
        <span>{task.each}</span>
      </div>

      <ul className={styles.list}>
        {friends.map((friend, index) => (
          <div className={styles.row} key={`container-${index}`}>
            <li key={`name-${index}`}>{friend.name}</li>

            <li
              key={`amount-${index}`}
              className={friend.amount >= 0 ? styles.pos : styles.neg}
            >
              {friend.amount >= 0
                ? `+ ${friend.amount.toFixed(2)}`
                : `Owes ${(friend.amount * -1).toFixed(2)}`}
            </li>
          </div>
        ))}
      </ul>

      <Button
        onClick={cls}
        title='Show Suggestions'
      />
      
      <ul className={styles.list}>
        {
          results.map( (result, index) => (
            <li key={index} className={styles.item} >{result}</li>
          ))
        }
      </ul>

      <div className={styles.row}>
        <ButtonLink
          title='New Gathering'
          href='/newGathering'
        />
        <ButtonLink
          title='Gatherings'
          href='/gatherings'
        />
      </div>

    </div>
  );
};

export default calculate;
