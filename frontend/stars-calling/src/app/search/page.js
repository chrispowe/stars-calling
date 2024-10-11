'use client';


import Header from '../components/header';
import ArtistResults from '../components/artistresults';
import styles from '../styles/search.module.css';

import react, {useState, useEffect} from 'react';
import axios from 'axios';
import Link from 'next/link';




function Search() {


    const [artistSearch, setArtistSearch] = useState('');
    const [artistResults, setArtistResults] = useState([]);
    const [user, setUser] = useState([]);

        //Search for artists or music releases
        function searchReq(e) {
            e.preventDefault();
            setArtistSearch(e.target.value)


            axios.post('http://localhost:4000/artist/search', {
                artistName: artistSearch
            }).then(res => setArtistResults(res.data))
            .catch(err => console.log(err));
        }

        useEffect(() => {
            axios.get('http://localhost:4000/user/currentUser', { withCredentials: true })
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
        }, []);


    return(
        <div className={styles.searchPage}>
            <Header />

            <div className={styles.searchMainBox}>
                <div className={styles.searchBox}>
                    <div>
                        <input name='artistName' value={artistSearch} onChange={searchReq} type='text' placeholder='search for artist/band or release' className={styles.searchBar}></input>
                    </div>
                </div>

                <div className={styles.resultsBox}>
                        <div className={styles.artistBox}>
                            {artistResults.map(artist => (
                                <ArtistResults artist={artist} key={artist.artistID} />
                            ))}
                        </div>

                    <div className={styles.releaseBox}>
                        <h2>release title</h2>
                        <h3>artist name ~ release date</h3>
                        <p>release type</p>
                    </div>
                </div>
            </div>
            {user.username ?
            <p>artist not showing up? add <Link href='http://localhost:3000/search/add'>here</Link></p>
            :
            null}
        </div>
    )
}

export default Search;