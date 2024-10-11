
const express = require('express');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

const dbConnection = require('../config/db.js');
const router = express.Router();

const randomID = uuidv4();

// GET ALL FINSHEDLISTENS FOR DASHBOARD
router.get('/recentFinish', (req, res) => {
    dbConnection.query('SELECT User.username, FinishedListen.finishedID, FinishedListen.body, FinishedListen.rating, FinishedListen.finishedDate, ArtistRelease.releaseTitle, ArtistRelease.releaseGenre, ArtistRelease.releaseDate, MusicArtist.artistName'
    + ' FROM FinishedListen'
    + ' INNER JOIN ArtistRelease ON FinishedListen.releaseID = ArtistRelease.releaseID'
    + ' INNER JOIN User ON FinishedListen.userID = User.userID'
    + ' INNER JOIN MusicArtist ON ArtistRelease.releaseArtist = MusicArtist.artistID'
    + ' ORDER BY FinishedListen.finishedDate DESC', (err, reviews) => {
        if (err) console.log(err);

        console.log(reviews);
        res.json(reviews);
        
    })
})

router.get('/finished', (req, res) => {
    dbConnection.query('SELECT User.username, FinishedListen.finishedID, FinishedListen.body, FinishedListen.rating, FinishedListen.finishedDate, ArtistRelease.releaseTitle, ArtistRelease.releaseGenre, ArtistRelease.releaseDate, MusicArtist.artistName'
    + ' FROM FinishedListen'
    + ' INNER JOIN ArtistRelease ON FinishedListen.releaseID = ArtistRelease.releaseID'
    + ' INNER JOIN User ON FinishedListen.userID = User.userID'
    + ' INNER JOIN MusicArtist ON ArtistRelease.releaseArtist = MusicArtist.artistID'
    + ' ORDER BY FinishedListen.finishedDate DESC', (err, reviews) => {
        if (err) console.log(err);

        res.json(reviews);
    })
})

router.get('/testing', (req, res) => {
    dbConnection.query('SELECT User.username, FinishedListen.finishedID, FinishedListen.body, FinishedListen.rating, FinishedListen.finishedDate, ArtistRelease.releaseTitle, ArtistRelease.releaseGenre, ArtistRelease.releaseDate, MusicArtist.artistName'
    + ' FROM FinishedListen'
    + ' INNER JOIN ArtistRelease ON FinishedListen.releaseID = ArtistRelease.releaseID'
    + ' INNER JOIN User ON FinishedListen.userID = User.userID'
    + ' INNER JOIN MusicArtist ON ArtistRelease.releaseArtist = MusicArtist.artistID', (err, reviews) => {
        if (err) console.log(err);

        console.log(reviews);
        res.json(reviews);
        
    })
})

router.get('/release/:id', (req, res) => {
    dbConnection.query('SELECT * FROM FinishedListen INNER JOIN User ON User.userID = FinishedListen.userID WHERE releaseID =? ORDER BY finishedDate DESC', [req.params.id], (err, reviews) => {
        if (err) console.log(err);

        res.json(reviews);
        console.log(reviews);
    })
})

//Get users plan to listen
router.get('/planlisten/:user', (req, res) => {
      try {
        dbConnection.query('SELECT * FROM PlanListen WHERE planUser=?', [req.params.user], (err, results) => {
            if (err) console.log(err);
    
            res.json(results);
        })
      } catch (err) {
        console.log(err);
      }
})

router.get('/everysingle/:user', (req, res) => {
    dbConnection.query('SELECT * FROM PlanToListen WHERE planUser=?', [req.params.user], (err, results) => {
        if (err) console.log(err);

        res.json(results);
        console.log(results);
    })
})

//Get users recently finished
router.get('/recentlyFinished/:user', (req, res) => {
    dbConnection.query('SELECT * FROM FinishedListen WHERE userID=? ORDER BY finishedDate DESC', [req.params.user], (err, results) => {
        if (err) console.log(err);

        res.json(results);
        console.log(results);
    })
})

module.exports = router;