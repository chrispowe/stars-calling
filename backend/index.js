const express = require('express');
const cors = require('cors');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// CORS
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// EXPRESS SETUP
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cookieParser());

app.use(sessions({
    secret: 'stars',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

// ROUTES
const userRoute = require('./routes/user.js');
app.use('/user', userRoute);

const artistRoute = require('./routes/artist.js');
app.use('/artist', artistRoute);

const releaseRoute = require('./routes/release.js');
app.use('/release', releaseRoute);

const listenRoute = require('./routes/listen.js');
app.use('/listen', listenRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`vibing in server ${PORT}`)
})