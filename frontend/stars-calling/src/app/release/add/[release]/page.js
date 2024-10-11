
'use client';

import Header from '@/app/components/header';
import react from 'react';

import styles from '../../../styles/release.module.css';
import { useParams } from 'next/navigation';


function AddRelease() {

    const releaseParam = useParams();
    const releaseIdent = releaseParam.release;

    return(
        <div className={styles.addReleasePage}>

            <div className={styles.addReleaseMainBox}>
                <form className={styles.addReleaseForm} action={`http://localhost:4000/release/addrelease/${releaseIdent}`} method='post'>
                    <label>Title: </label>
                    <input type='text' name='releaseTitle'></input>

                    <label>Release Type: </label>
                    <select name='releaseType'>
                        <option value='LP'>LP</option>
                        <option value='EP'>EP</option>
                    </select>

                    <label>Genre: </label>
                    <input input='text' name='releaseGenre'></input>

                    <label>Release Date: </label>
                    <input type='date' name='releaseDate'></input>

                    <button type='submit'>ADD RELEASE</button>
                </form>
            </div>
        </div>
    )
}

export default AddRelease;