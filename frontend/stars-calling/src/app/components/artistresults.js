
import styles from '../styles/search.module.css';

import Link from 'next/link';

function ArtistResults(props) {

    let {artist} = props;

    const artistURL = artist.artistID;
    console.log(artistURL);

    return(
        <div className={styles.artist}>
            <Link href={`http://localhost:3000/artist/${artistURL}`}><h3>{artist.artistName}</h3></Link>
        </div>
    )
}

export default ArtistResults;