
'use client';

import styles from './styles/dashboard.module.css';
import Header from './components/header';
import Review from './components/review';

import react, {useState, useEffect} from 'react';
import axios from 'axios';
import Link from 'next/link';
import UserListens from './components/userlistens';

function Home() {

  const [reviews, setReviews] = useState([]);
  const [planListen, setPlanListen] = useState([]);
  const [userFinished, setUserFinished] = useState([]);
  const [user, setUser] = useState([]);

  //GET USER INFO
  useEffect(() => {
    axios.get('http://localhost:4000/user/currentUser', { withCredentials: true })
    .then(res => setUser(res.data))
    .catch(err => console.log(err));
}, []);

const userString = JSON.stringify(user.userID);

// GET RECENT REVIEWS
  useEffect(() => {
      axios.get('http://localhost:4000/listen/recentFinish')
      .then(res => setReviews(res.data))
      .catch(err => console.log(err));
  }, []);

  console.log(userString)
  
  //GET USERS PLANNED TO LISTEN RELEASES
  useEffect(() => {
    axios.get(`http://localhost:4000/listen/planlisten/${userString}`, {withCredentials: true})
    .then(res => setPlanListen(res.data))
    .catch(err => console.log(err));
  }, [])

  //GET USERES RECENTLY FINISHED RELEASES
  useEffect(() => {
    axios.get(`http://localhost:4000/listen/recentlyFinished/${userString}`)
    .then(res => setUserFinished(res.data))
    .catch(err => console.log(err));
  }, []);
  
  console.log(planListen);
  console.log(userFinished);

  return (
    <main>

      <Header />

      <div className={styles.dashboard}>
        <div className={styles.navBox}>
          <h2><Link href='/'>home</Link></h2>
          <h2><Link href='/search'>search</Link></h2>
        </div>

        <div className={styles.mainBox}>
          <div>
            <h3>recent reviews</h3>
          </div>

            {reviews.map(review => (
              <Review key={review.finishedID} review={review} />
            ))}
        </div>

        <div className={styles.listBox}>
          <div>
              <h3>Recently finished</h3>
              {userFinished.length == 0 ?
              <p>you have no finished listens</p> 
              :
              <p>yay !</p>}
          </div>

          <div>
              <h3>Plan to listen</h3>
              {planListen.length == 0 ?
              <p>you have no planned listens</p>
            :
            <p>omg !!!!!!</p>}
          </div>
        </div>
      </div>
      </main>
  )
}

export default Home;