'use client';

import Header from "@/app/components/header";
import { useParams } from "next/navigation";

import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import dayjs from 'dayjs';

import styles from '../../styles/artist.module.css';

function Artist() {

    const paramName = useParams();
    const [artist, setArtist] = useState([]);
    const [releases, setReleases] = useState([]);

    const artistIdent = paramName.artist;

    useEffect(() => {
        axios.get(`http://localhost:4000/artist/${artistIdent}`)
        .then(res => setArtist(res.data[0]))
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:4000/release/${artistIdent}`)
        .then(res => setReleases(res.data))
        .catch(err => console.log(err));
    }, []);

    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/user/currentUser', { withCredentials: true })
        .then(res => setUser(res.data))
        .catch(err => console.log(err));
    }, []);

    return(
        <div className={styles.artistPage}>
            <Header />

            <div className={styles.artistMainBox}>
                <div className={styles.releaseBox}>
                    <div>
                        <h1>{artist.artistName}</h1>
                    </div>

                    <div className={styles.artistReleaseBox}>
                        <div className={styles.albumBox}>
                            <h1>Albums</h1>

                            {releases.map(release => (
                                <div>
                                    {release.releaseType == 'LP' ?
                                    <div>
                                        <Link href={`http://localhost:3000/release/${release.releaseID}`}><h3>{release.releaseTitle} {dayjs(release.releaseDate).format('YYYY')}</h3></Link>
                                    </div>: null}
                                </div>
                            ))}
                        </div>
                        <div className={styles.epBox}>
                            <h1>EPs</h1>
                            {releases.map(release => (
                                <div>
                                    {release.releaseType == 'EP' ?
                                    <div>
                                        <h3>{release.releaseTitle}</h3>
                                    </div>: null}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            {user.username ?
            <p>release not added yet? add <Link href={`http://localhost:3000/release/add/${artist.artistID}`}>here</Link></p>
            :
            null
            }
        </div>
    )
}

export default Artist;