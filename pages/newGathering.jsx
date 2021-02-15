import Button from "../components/Button/Button";
import styles from "../styles/NewGathering.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import localForage from "localforage";
import moment from "moment";


/* const Friend = ({ placeholder, indexN }) => {
    const [name, setName] = useState("")
    const [amount, setAmount] = useState(0)

    return (
        <div className={styles.friend}>
            <input 
                type="text"
                placeholder={placeholder}
                value={name}
                name="name"
                onChange={e => setName(e.target.value)}
                className={styles.input}
            />
            <input
                type="number"
                placeholder="Money Spent"
                value={amount}
                name="amount"
                onChange={e => setAmount(e.target.value)}
                className={styles.input}
            />
        </div>
    )
} */

const newGathering = () => {
  const router = useRouter();

  const [gathName, setGathName] = useState("");

  const [friends, setFriends] = useState([
    {
      name: "",
      amount: "",
    },
    {
      name: "",
      amount: "",
    },
  ]);

  const createdAt = moment().format('ll')

  const addFriend = () => {
    if (friends.length >= 10) {
      return alert("Sory 10 our limit :(");
    }
    const newFriends = [...friends, { name: "", amount: 0 }];
    setFriends(newFriends);
  };

  const removeFriend = () => {
    if (friends.length <= 2) return alert("You need a least one friend");
    const newFriends = friends.splice(0, friends.length - 1);
    setFriends(newFriends);
  };

  const sendGathering = () => {

    if ( gathName ) {

        localForage.getItem('gatherings')
        .then( data =>{
          data.push({
            gathName : gathName,
            friends : friends,
            createdAt: createdAt
          })

          localForage.setItem('gatherings', data)
          .then( data => console.log(data) )
          .catch( err => console.log(err) )

        })
        .catch( err => console.log(err) )
      return true;

    } else {
      alert("The gathering should have a name");
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    sendGathering() && router.push({
      pathname: `/results/calculate`,
      query: {
        gathName : gathName,
        friends : JSON.stringify(friends)
      }
    })
  }

  const handleInputChange = (index, event) => {
    const values = [...friends];
    if (event.target.name === "name") {
      values[index].name = event.target.value;
    } else {
      values[index].amount = event.target.value;
    }

    setFriends(values);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="text"
        placeholder="Gath name"
        className={styles.input}
        onChange={(e) => setGathName(e.target.value)}
      />

      <Button onClick={addFriend} title="Add a friend" />

      {friends.map((friend, index) => (
        <div key={`container-${index}`} className={styles.friend}>
          <input
            type="text"
            placeholder={index === 0 ? "Your name" : "Friend's name"}
            value={friend.name}
            name="name"
            id="name"
            onChange={(event) => handleInputChange(index, event)}
            className={styles.input}
            key={`name-${index}`}
            required = {true}
          />
          <input
            type="number"
            placeholder="Money Spent"
            value={friend.amount}
            name="amount"
            id="amount"
            onChange={(event) => handleInputChange(index, event)}
            className={styles.input}
            key={`amount-${index}`}
            required = {true}
          />
        </div>
      ))}

      <div className={styles.row}>
        <Button onClick={addFriend} title="+" />
        <Button onClick={removeFriend} title="-" />
      </div>

      <Button
        type='submit'
        title="Calculate"
      />
    </form>
  );
};

export default newGathering;
