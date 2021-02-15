import styles from "../../styles/Calculate.module.scss";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Button from '../../components/Button/Button'
import ButtonLink from '../../components/ButtonLink/ButtonLink'

const calculate = () => {
  const router = useRouter();

  const [count, setCount] = useState(0);

  const [friends, setFriends] = useState([]);

  const [results, setResults] = useState([]);

  const [total, setTotal] = useState(0)
  
  const [each, setEach] = useState(0)
  
  let totalVar = 0
  let eachVar = 0

  const totalFnc = (friends) => {
    friends.forEach(
      friend => (totalVar = totalVar + parseFloat(friend.amount))
    );
    return setTotal(totalVar)
  };

  const eachFriend = (friends) => {
    eachVar = totalVar / friends.length;
    setEach(parseFloat(eachVar.toFixed(2)))
  };

  const sortAndSet = (friends) => {
    let friends1 = friends.sort((a, b) => {
      if (parseInt(a.amount) > parseInt(b.amount)) {
        return -1;
      }
      if (parseInt(a.amount) < parseInt(b.amount)) {
        return 1;
      }
      return 0;
    });

    friends1.map((friend) => {
      friend.amount = parseInt(friend.amount) - eachVar;
    });

    setFriends(friends1);
  };

  const compareResults = () => {

    const neg1 = (friends.filter( friend => friend.amount < 0)).reverse()
    const pos1 = friends.filter( friend => friend.amount > 0);
    
    const arr = [];

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
          } else if (res < 0) {
            pos1[i].amount != 0 &&
              arr.push(`${neg1[num].name} pays ${pos1[i].amount.toFixed(2)} to ${pos1[i].name}`);
            pos1[i].amount = 0;
            neg1[num].amount = res;
          } else {
            pos1[i].amount != 0 &&
              arr.push(`${neg1[num].name} pays ${pos1[i].amount.toFixed(2)} to ${pos1[i].name}`);
            pos1[i].amount = 0;
            neg1[num].amount = 0;
          }
        } else {
          return;
        }
      }
    }
    setResults(arr);
  };

  useEffect(() => {
    try {
      let queryFriends = JSON.parse(router.query.friends)

      if (queryFriends === null) {
        return router.push({ pathname: `/newGathering` });
      } else {
        totalFnc(queryFriends);
        eachFriend(queryFriends);
        sortAndSet(queryFriends);
        compareResults()
      }
   
    } catch (err) {
      console.log(err);
    }
  }, []);

  const compare = () => {
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
        <span>{total}</span>
      </div>

      <div className={styles.results}>
        <h3>
          Each
          <br />
          Friend
        </h3>
        <span>{each}</span>
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
        onClick={compare}
        title='Show Suggestions'
      />
      
      <ul className={styles.list}>
        {
          results.map( (result, index) => (
            <li key={index} className={styles.item} >{result}</li>
          ))
        }
      </ul>

      <div className={styles.buttons}>
        <div className={styles.button}>
          <ButtonLink
            title='New Gath'
            href='/newGathering'
          />
        </div>
        <div className={styles.button}>
          <ButtonLink
            title='Your Gaths'
            href='/gatherings'
          />
        </div>
      </div>

    </div>
  );
};

export default calculate;
