const express = require('express');
const dbConnection = require('../config/db.js');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

const router = express.Router();

const randomID = uuidv4();

// dbConnection.query('SELECT * FROM User', (err, result) => {
//     console.log(result)
// })

// CHECK IF USER IS LOGGED IN
router.get('/currentUser', (req, res) => {
    if (!req.session.user) {
        console.log(false);
        res.json(false);
    }

    if (req.session.user) {
        console.log(req.session.user.userID);
        res.json(true);
    }
})

// USER LOGIN
router.post('/login', (req, res) => {

   dbConnection.query('SELECT * FROM User WHERE username=?', [req.body.username], (err, result) => {
        if (err) console.log(err);

        if (result) {
            if (result[0].userPassword == req.body.userPassword) {
                res.json(result[0]);

                req.session.user = result[0];
                req.session.save();
            }
            if (result[0].userPassword != req.body.userPassword) {
                res.status(401).send('username or password incorrect');
            }
        }
    })
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