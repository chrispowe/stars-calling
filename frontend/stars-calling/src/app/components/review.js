
'use client';

import styles from '../styles/dashboard.module.css';

import react from 'react';
import dayjs from 'dayjs';


//Component for a review, mainnly used for home page
function Review(props) {

    const {review} = props;

    const reviewDate = dayjs(review.finishedDate).format('MM/DD/YYYY');

    console.log(reviewDate);


    return(
        <div className={styles.reviewBox}>
            <div>
                <h2>{review.releaseTitle}</h2>
                <h3>{review.artistName}</h3>
            </div>

            <div>
                <p>review by: {review.username} ~ {reviewDate}</p>
                <p>{review.body}</p>
            </div>
        </div>
    )
}

export default Review;