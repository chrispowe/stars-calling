

'use client';

import styles from '../styles/release.module.css';

import react from 'react';
import dayjs from 'dayjs';


//Mini version of review.js component, used for the direct release page
function ReleaseReview(props) {

    const {review} = props;

    const reviewDate = dayjs(review.finishedDate).format('DD/MM/YYYY');

    console.log(reviewDate);


    return(
        <div className={styles.reviewBox}>
            <div>
                <p>review by: {review.username} ~ {reviewDate}</p>
                <p>{review.body}</p>
            </div>
        </div>
    )
}

export default ReleaseReview;