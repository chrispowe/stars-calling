'use client';

import { FormEvent } from 'react';

import react, {useState} from 'react';
import styles from '../styles/login.module.css';

function LogIn() {

    return(
        <main className={styles.loginPage}>

            
            <div className={styles.loginBox}>
                <h1 className={styles.h1}>LOG IN !</h1>

                <form className={styles.loginForm} action='http://localhost:4000/user/login' method='post'>
                    <label>Username:</label>
                    <input type='text' name='username'></input>

                    <label>Password:</label>
                    <input type='password' name='userPassword'></input>

                    <button type='submit'>LOGIN</button>
                </form>
            </div>
        </main>
    )
}

export default LogIn;