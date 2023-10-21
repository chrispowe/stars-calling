const express = require('express');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

const dbConnection = require('../config/db.js');
const router = express.Router();

const randomID = uuidv4();


// ADD RELEASE TO ARTIST DISCOGRAPHY
router.post('/addrelease/:id', (req, res) => {
    dbConnection.query('INSERT INTO ArtistRelease(releaseID, releaseTitle, releaseType, releaseGenre, releaseArtist) VALUES (?,?,?,?, ?)', [randomID, req.body.releaseTitle, req.body.releaseType, req.body.releaseGenre, req.params.id]);

    dbConnection.query('SELECT * FROM ArtistRelease WHERE releaseTitle=?', [req.body.releaseTitle], (err, result) => {
        if (err) console.log(err);

        res.json(result);
        console.log(result);
    })
})

// GET DISCOGRAPHY OF ARTIST
router.get('/:artistID', (req, res) => {
    dbConnection.query('SELECT * FROM ArtistRelease WHERE releaseArtist=?', [req.params.artistID], (err, result) => {
        if (err) console.log(err);

        res.json(result);
        console.log(result);
    })
});

// ADD RELEASE TO USERS PLAN TO LISTEN COLLECTION
router.post('/addListen/:releaseID', (req, res) => {
    dbConnection.query('INSERT INTO PlanToListen(planID, planAlbum, planUser) VALUES (?, ?, ?)', [randomID, req.params.releaseID, req.session.user.userID], (err, result) => {
        if (err) console.log(err);

        res.json('added to users planned to listen list !')
    });
});

// REMOVE RELEASE FROM USER PLAN TO LISTEN COLLECTION
router.delete('/removeListen/:planID', (req ,res) => {
    dbConnection.query('DELETE FROM PlanToListen WHERE planID=?', [req.params.planID], (err, result) => {
        if (err) console.log(err);

        console.log('removed release from user list');
        res.json('removed release from user list');
    })
});

// GET USERS PLANTOLISTEN RELEASES
router.get('/currentPlan/:userID', (req, res) => {
    dbConnection.query('SELECT * FROM PlanToListen WHERE planUser=?', [req.params.userID], (err, result) => {
        if (err) console.log(err);

        console.log(result);
        res.json(result);
    })
})

var todayDate = new Date().toISOString().slice(0, 10);

// ADD RELEASE TO USERS FINISHED LIST
router.post('/finished/:releaseID', (req, res) => {
    dbConnection.query('INSERT INTO FinishedListen(finishedID, userID, releaseID, rating, finishedDate) VALUES (?,?,?,?,?)', [randomID, req.session.user.userID, req.params.releaseID, req.body.rating, todayDate], (err, result) => {
        if (err) console.log(err);

        console.log('success');
        res.json('success');
    });
})

// GET USERS FINISHEDLISTEN COLLECTION
router.get('/finished/:userID', (req, res) => {
    dbConnection.query('SELECT * FROM FinishedListen WHERE userID=?', [req.params.userID], (err, result) => {
        if (err) console.log(err);

        console.log(result);
        res.json(result);
    })
})

module.exports = router;