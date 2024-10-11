'use client';

import react, {useState} from 'react';
import styles from '../styles/login.module.css';
import Header from '../components/header';

function SignUp() {

    const [email, setEmail] = useState('');
    const [correctEmail, setCorrectEmail] = useState(null);
    const [username, setUsername] = useState('');
    const [correctUsername, setCorrectUsername] = useState(null);
    const [password, setPassword] = useState('');
    const [correctPassword, setCorrectPassword] = useState(null);


    //Check to make sure email is valid
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    function checkEmail(e) {
        e.preventDefault();
        setEmail(e.target.value)

        const correct = emailRegex.exec(email);

        correct == null ? setCorrectEmail(false) : setCorrectEmail(true);
    }

    //Make sure username is valid
    const usernameRegex = /^[0-9A-Za-z]{6,16}$/;

    function checkUsername(e) {
        e.preventDefault();
        setUsername(e.target.value)

        const correct = usernameRegex.exec(username);

        correct == null ? setCorrectUsername(false) : setCorrectUsername(true);
    }

    //Make sure password is valid
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/;

    function checkPassword(e) {
        e.preventDefault();
        setPassword(e.target.value)

        const correct = passwordRegex.exec(password);

        correct == null ? setCorrectPassword(false) : setCorrectPassword(true);
    }

    return(
        <main className={styles.loginPage}>

            
            <div className={styles.loginBox}>
                <h1 className={styles.h1}>SIGN UP !</h1>

                <form className={styles.loginForm} action='http://localhost:4000/user/signup' method='post'>
                    <label>Email:</label>
                    <input type='text' name='email' onChange={checkEmail}></input>
                    {correctEmail == false ?
                    <h3>invalid email</h3>
                    : null}

                    <label>Username:</label>
                    <input type='text' name='username' onChange={checkUsername}></input>
                    {correctUsername == false ?
                    <p>invalid username. username must be between 6-16 characters. only letters and numbers. no spaces or special characters</p>
                    : null}

                    <label>Password:</label>
                    <input type='text' name='userPassword' onChange={checkPassword}></input>
                    {correctPassword == false ?
                    <p>invalid password. password needs to be at least 8 characters that includes a letter and number.</p>
                    : null}

                    {correctEmail == true && correctUsername == true && correctPassword == true 
                    ?
                    <button type='submit'>SIGNUP</button>
                :
                    <button disabled className={styles.cantSignUp}>SIGNUP</button>}
                </form>
            </div>
        </main>
    )
}

export default SignUp;