import Button from "../components/Button/Button";
import ButtonLink from "../components/ButtonLink/ButtonLink";
import styles from "../styles/NewGathering.module.scss";
import { useState } from "react";

const Friend = ({ placeholder }) => {
    const [name, setName] = useState("")
    const [amount, setAmount] = useState(0)

    return (
        <div className={styles.friend}>
            <input 
                type="text"
                placeholder={placeholder}
                value={name}
                onChange={e => setName(e.target.value)}
                className={styles.input}
            />
            <input
                type="number"
                placeholder="Money Spent"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className={styles.input}
            />
        </div>
    )
}

const FriendAE = {
  name: "",
  amount: "",
};

const newGathering = () => {

  const [friends, setFriends] = useState([FriendAE, FriendAE]);

  const addFriend = () => {
    if(friends.length >= 15) return alert('Sory 15 our limit :(')
    const newFriends = [...friends, FriendAE]
    setFriends(newFriends)
  };

  const removeFriend = () => {
    if( friends.length <= 2 ) return alert('You need a least one friend')
    const newFriends = friends.splice(0 , friends.length -1)
    setFriends(newFriends);
  };

  const sendGathering= e =>{
      e.preventDefault()

      console.log('algo')
  }

  return (
    <form onSubmit={sendGathering} className={styles.container}>
      <input
        type="text"
        placeholder="Gathering name"
        className={styles.input}
      />

      <Button title="Add a friend" />

      {friends.map((index) => (
        <Friend key={index} placeholder={ index == 0 ? 'Your name' : "Friend's name"} />
      ))}

      <div className={styles.row}>
        <Button onClick={addFriend} title="+" />
        <Button onClick={removeFriend} title="-" />
      </div>

      {/* <ButtonLink title="Calculate" href="/calculate" /> */}
      <button type='submit'></button>
    </form>
  );
};

export default newGathering;
