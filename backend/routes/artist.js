const express = require('express');
const res = require('express/lib/response');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');
const dbConnection = require('../config/db.js');

const router = express.Router();

const randomID = uuidv4();

// TEST FOR ARTIST QUERY
// dbConnection.query('SELECT * FROM Artist', (err, result) => {
//     if (err) console.log(err);

//     console.log(result);
//     res.send(result);
// })

// ADD TO ARTIST (MUST BE LOGGED IN)
router.post('/addartist', (req, res) => {
    dbConnection.query("INSERT INTO MusicArtist(artistID, artistName, artistType, genre) VALUES (?, ?, ?, ?)", [randomID, req.body.artistName, req.body.artistType, req.body.genre]);


    dbConnection.query('SELECT * FROM MusicArtist WHERE artistName=?', [req.body.artistName], (err, result) => {
        if (err) console.log(err);

        console.log(result[0]);
        res.json(result[0]);
    });
})

// GET SPECIFIC ARTIST
router.get('/:id', (req, res) => {
    dbConnection.query('SELECT * FROM MusicArtist WHERE artistID=?', [req.params.id], (err, result) => {
        if (err) console.log(err);

        res.json(result);
        console.log(result);
    })
})

// UPDATE SPECIFIC ARTIST (MUST BE LOGGED IN)
router.put('/update/:id', (req, res) => {
    dbConnection.query('UPDATE MusicArtist SET artistID = ? WHERE artistName=? AND artistType=? AND genre=?', [req.params.id, req.body.artistName, req.body.artistType, req.body.genre], (err, result) => {
        if (err) console.log(err);

        res.json(result);
        console.log('update successful !');
    })
});

router.post('/search', (req, res) => {
    dbConnection.query(`SELECT * FROM MusicArtist WHERE ArtistName LIKE ?`, ['%' + req.body.artistName + '%'], (err, results) => {
        if (err) console.log(err);

        res.json(results);
    })
})

module.exports = router;