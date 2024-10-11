const express = require('express');
const dbConnection = require('../config/db.js');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

const router = express.Router();

const randomID = uuidv4();

// CHECK IF USER IS LOGGED IN
router.get('/currentUser', (req, res) => {

    try {
        if (req.session.user) {
            console.log(req.session.user);
            res.send(req.session.user);
        } else {
            res.json('no one is currently logged in')
        }
    } catch(err) {
        console.log(err);
    }
})

// USER LOGIN
router.post('/login', (req, res) => {

    function login() {

        try {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    dbConnection.query('SELECT * FROM User WHERE username=?', [req.body.username], (err, result) => {
                        if (err) reject(err);
        
                        if (!result) {
                            reject('Wrong username or password')
                            res.redirect(401, 'back');
                        } else {
                            if (req.body.userPassword != result[0].userPassword) {
                                reject('Wrong username or password');
                                logged = false;
                                res.redirect(401, 'back');
                            } else {
                                resolve('Success');
                                req.session.user = result[0];
                                req.session.save();
                                res.redirect('http://localhost:3000');
                            }
                        }
                    })
                }, 2000)
                })
        } catch (err) {
            console.log(err);
        }
    }

    login();
});

// USER LOG OUT
router.get('/logout', (req, res) => {
    req.session.destroy();
})

// USER SIGN UP
router.post('/signup', (req, res) => {
    dbConnection.query('SELECT * FROM User WHERE email=?', [req.body.email],(err, result) => {
        if (err) console.log(err);

        if (result[0]) {
            res.status(409).send('email already in use');
        }

        if (!result[0]) {
            dbConnection.query('SELECT * FROM User WHERE username=?', [req.body.username], (err, result) => {
                if (err) console.log(err);

                if (result[0]) {
                    res.status(409).send('username already in use');
                }

                if (!result[0]) {
                    dbConnection.query('INSERT INTO USER(userID, email, username, userPassword) VALUES (?,?,?,?)', [randomID, req.body.email, req.body.username, req.body.userPassword]);

                    dbConnection.query('SELECT * FROM User WHERE username=?', [req.body.username], (err, result) => {
                        if (err) console.log(err);

                        res.json(result[0]);

                        req.session.user = result[0];
                        req.session.save();
                    })
                }
            })
        }
    })
});

module.exports = router;