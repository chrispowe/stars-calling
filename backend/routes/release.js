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
    dbConnection.query('INSERT INTO ArtistRelease(releaseID, releaseTitle, releaseType, releaseGenre, releaseArtist, releaseDate) VALUES (?,?,?,?,?,?)', [randomID, req.body.releaseTitle, req.body.releaseType, req.body.releaseGenre, req.params.id, req.body.releaseDate]);

    dbConnection.query('SELECT * FROM ArtistRelease WHERE releaseTitle=?', [req.body.releaseTitle], (err, result) => {
        if (err) console.log(err);

        console.log(result.releaseID);
        res.redirect(`http://localhost:3000/release/${result.releaseID}`);
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

router.get('/:releaseID', (req, res) => {
    dbConnection.query('SELECT * FROM ArtistRelease WHERE releaseID=?', [req.params.releaseID],  (err, release) => {
        if (err) console.log(err);

        res.json(release);
        console.log(release);
    })
})

router.get('/get/:releaseIdent', (req, res) => {
    dbConnection.query('SELECT ArtistRelease.releaseID, ArtistRelease.releaseTitle, ArtistRelease.releaseType, ArtistRelease.releaseGenre, ArtistRelease.releaseDate, MusicArtist.artistID, MusicArtist.artistName' 
    +' FROM ArtistRelease'
    +' INNER JOIN MusicArtist ON ArtistRelease.releaseArtist = MusicArtist.artistID'
    +' WHERE releaseID=?', [req.params.releaseIdent], (err, release) => {
        if (err) console.log(err);

        res.json(release);
    })
})

// ADD RELEASE TO USERS PLAN TO LISTEN COLLECTION
router.post('/addListen/:releaseID', (req, res) => {
    dbConnection.query('INSERT INTO PlanListen(planID, planAlbum, planUser) VALUES (?, ?, ?)', [randomID, req.params.releaseID, req.session.user.userID], (err, result) => {
        if (err) console.log(err);

        res.redirect('http://localhost:3000')
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

    try {
         dbConnection.query('INSERT INTO FinishedListen(finishedID, userID, releaseID, rating, body, finishedDate) VALUES (?,?,?,?,?,?)', [randomID, req.session.user.userID, req.params.releaseID, req.body.rating, req.body.body, todayDate], (err, result) => {
            if (err) console.log(err);
    
             res.redirect('back');
        });
    } catch (err) {
        console.log(err);
    }
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