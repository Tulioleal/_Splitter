import styles from '../../styles/Calculate.module.scss'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import localforage from 'localforage'


const calculate = () => {

    const router = useRouter()
    
    const [task, settask] = useState({})

    const [friends, setfriends] = useState([])

    const total = (gath) =>{
        let total = 0
        gath.friends.forEach(element => total = total + parseFloat(element.amount));
        gath.total = total
    }

    const eachFriend = (gath) => {
        let each = gath.total / parseFloat(gath.friends.length)
        gath.each = each.toFixed(2)
    }

    useEffect(()=> {
        try{
            localforage.getItem(router.query.gathName).then( returnedGath => {
                total(returnedGath)
                eachFriend(returnedGath)
                settask(returnedGath)
                setfriends(returnedGath.friends)
            })
        }catch (err) {
            console.log(err)
        }
    }, [])

    const cls = () => console.log(friends)

    return (
        <div
            onClick={cls}
            className={styles.container}
        >
            <h2>{router.query.gathName}</h2>

            <div className={styles.results}>
                <h3>Total</h3>
                <span>{task.total}</span>
            </div>

            <div className={styles.results}>
                <h3>Each<br/>Friend</h3>
                <span>{task.each}</span>
            </div>
            
            <ul className={styles.list}>
                {friends.map( (friend, index) => (
                    <div className={styles.row} key={`container-${index}`}>
                        <li 
                            key={`name-${index}`}
                        >
                            {friend.name}
                        </li>

                        <li 
                            key={`amount-${index}`}
                            className={ parseFloat(friend.amount) - parseFloat(task.each) >= 0 ? styles.pos : styles.neg}
                        >

                            { parseFloat(friend.amount) - parseFloat(task.each) >= 0 
                            ? `+ ${parseFloat(friend.amount - parseFloat(task.each)).toFixed(2)}` 
                            : `Owes ${((parseFloat(friend.amount) - parseFloat(task.each)) * -1).toFixed(2)}` }

                        </li>
                    </div>
                ))}
            </ul>

            <h3 className={styles.title}>Suggestions</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta alias quidem nihil ex, aspernatur odit?</p>
        </div>
    )
}

export default calculate
