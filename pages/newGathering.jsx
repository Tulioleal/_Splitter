import Button from "../components/Button/Button";
import ButtonLink from "../components/ButtonLink/ButtonLink";
import styles from "../styles/NewGathering.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

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

  const addFriend = () => {
    if (friends.length >= 15) {
      return alert("Sory 15 our limit :(");
    }
    const newFriends = [...friends, { name: "", amount: 0 }];
    setFriends(newFriends);
  };

  const removeFriend = () => {
    if (friends.length <= 2) {
      return alert("You need a least one friend");
    }
    const newFriends = friends.splice(0, friends.length - 1);
    setFriends(newFriends);
  };

  const sendGathering = () => {
    if ( gathName && friends && localStorage.getItem(`splitter-${gathName}`) === null ) {
      localStorage.setItem(`splitter-${gathName}`, JSON.stringify(friends));
      return true;
    } else {
      alert("no");
      return false;
    }
  };

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
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Gathering name"
        className={styles.input}
        onChange={(e) => setGathName(e.target.value)}
      />

      <Button onClick={addFriend} title="Add a friend" />

      {friends.map((friend, index) => (
        <div className={styles.friend}>
          <input
            type="text"
            placeholder={index === 0 ? "First name" : "Friend's name"}
            value={friend.name}
            name="name"
            id="name"
            onChange={(event) => handleInputChange(index, event)}
            className={styles.input}
            key={`${index}-name`}
            required={true}
          />
          <input
            type="number"
            placeholder="Money Spent"
            value={friend.amount}
            name="amount"
            id="amount"
            onChange={(event) => handleInputChange(index, event)}
            className={styles.input}
            key={`${index}-amount`}
            required={true}
          />
        </div>
      ))}

      <div className={styles.row}>
        <Button onClick={addFriend} title="+" />
        <Button onClick={removeFriend} title="-" />
      </div>

      <Button
        onClick={(e) => {
          e.preventDefault
          sendGathering() ? router.push(`/results/${gathName}`) : router.push(`/newGathering`)
        }}
        title="Calculate"
      />
    </div>
  );
};

export default newGathering;
