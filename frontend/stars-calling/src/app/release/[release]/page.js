
'use client';

import react, {useState, useEffect} from 'react';
import { useParams } from "next/navigation";

import axios from 'axios';
import dayjs from 'dayjs';
import Link from 'next/link';
import Header from '@/app/components/header';

import styles from '../../styles/release.module.css';
import ReleaseReview from '@/app/components/releasereview';


function Release() {

    const releaseParam = useParams();
    const [release, setRelease] = useState([]);
    const [reviews, setReviews] = useState([]);

    const releaseIdent = releaseParam.release;

    useEffect(() => {
        axios.get(`http://localhost:4000/release/get/${releaseIdent}`)
        .then(res => setRelease(res.data[0]))
        .catch(err => console.log(err));
    }, []);

    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/user/currentUser', { withCredentials: true })
        .then(res => setUser(res.data))
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:4000/listen/release/${releaseIdent}`)
        .then(res => setReviews(res.data))
        .catch(err => console.log(err));
    }, []);

    const releaseDate = dayjs(release.releaseDate).format('MMM DD, YYYY');

    return(
        <div className={styles.releasePage}>
            <Header />
            <div className={styles.releaseMainBox}>
                <div className={styles.releaseInfoBox}>
                    <h1>{release.releaseTitle}</h1>
                    <h3>{release.artistName}</h3>
                    <p>released {releaseDate}</p>

                    {user.username 
                    ?
                    <form action={`http://localhost:4000/release/addListen/${release.releaseID}`} method='post'>
                        <button type='submit'>ADD TO PLAN TO LISTEN</button>
                    </form>
                    :
                    null
                    }
                </div>

                <div className={styles.reviewsBox}>
                    <h2>{release.releaseTitle} reviews</h2>

                    {user == 'no one is currently logged in' ? null :
                    <div>
                        <form action={`http://localhost:4000/release/finished/${releaseIdent}`} method='post'>
                        <label>rating: </label>
                        <select name='rating'>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>

                        <label>review **optional**</label>
                        <textarea name='body' />
                        <button type='submit'>SUBMIT REVIEW</button>
                        </form>
                    </div>
                    }

                    {reviews.map(review => (
                        <ReleaseReview key={review.finishedID} review={review} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Release;