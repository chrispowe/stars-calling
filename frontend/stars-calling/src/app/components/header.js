'use client';

import react, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../styles/header.module.css';

//Header for every page, inludes login/signup buttons
function Header() {

    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/user/currentUser', { withCredentials: true })
        .then(res => setUser(res.data))
        .catch(err => console.log(err));
    }, []);

    // const response = await fetch("http://localhost:4000/user/currentUser", {credentials: 'include'});
    // const user = await response.json();

    console.log(user);

    return (
        <div className={styles.header}>
            <h3><Link href='/'>stars calling !</Link></h3>
            <h3>|</h3>
            {user.username ? <h3>{user.username}</h3> : 
            <div>
                <h3><Link href='/login'>login</Link></h3>
                <h3><Link href='/signup'>signup</Link></h3>
            </div>}
        </div>
    )
}

export default Header;