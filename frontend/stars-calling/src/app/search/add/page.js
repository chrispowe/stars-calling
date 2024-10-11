

import Header from '@/app/components/header';
import react from 'react';

import styles from '../../styles/artist.module.css';

//Form to add an artist to the database if they don't exist
function AddArtist() {
    return(
        <div className={styles.addArtistPage}>

            <div className={styles.addArtistMainBox}>
                <form action='http://localhost:4000/artist/addartist' method='post' className={styles.addArtistForm}>
                    <label>Artist/Band Name:</label>
                    <input type='text' name='artistName'></input>

                    <label>Type: </label>
                    <select name='artistType'>
                        <option>Artist</option>
                        <option>Band</option>
                    </select>

                    <label>Genre: </label>
                    <input type='text' name='genre'></input>

                    <button type='submit'>ADD ARTIST</button>
                </form>
            </div>
        </div>
    )
}

export default AddArtist;