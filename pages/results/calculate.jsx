import styles from "../../styles/Calculate.module.scss";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import localforage from "localforage";

const calculate = () => {
  const router = useRouter();

  const [task, settask] = useState({});

  const [friends, setfriends] = useState([]);

  const [posNeg, setPosNeg] = useState({})

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

    setfriends(friends);
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
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  let negFnc = friends.filter( ar => ar.amount < 0 )
  negFnc = negFnc.reverse()

  const posFnc = friends.filter( ar => ar.amount > 0 )
  const eqFnc = friends.filter( ar => ar.amount === 0 )

  const result = ( pos , neg ) => {

    let action = []

    let maxP = pos[0].amount
    let maxN = neg[0].amount
    let res = maxP + maxN

    if ( res > 0 ) {
        action[0] = `${neg[0].name} pays ${neg[0].amount * -1} to ${pos[0].name} >`
        pos[0].amount = res
        neg[0].amount = 0
    } else if ( res < 0 ) {
        action[0] = `${neg[0].name} pays ${pos[0].amount} to ${pos[0].name} <`
        pos[0].amount = 0
        neg[0].amount = res
    } else{
        action[0] = `${neg[0].name} pays ${pos[0].amount} to ${pos[0].name} def`
        pos.amount = res
        neg.amount = res
    }   

    console.log(action, pos, neg, res)
  }

  const cls = () => console.log(result(posFnc, negFnc));

  return (
    <div onClick={cls} className={styles.container}>
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

      <h3 className={styles.title}>Suggestions</h3>

    {

    }

      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta alias quidem nihil ex, aspernatur odit?
      </p>
    </div>
  );
};

export default calculate;
