const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors=require("cors");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session')


require('dotenv').config();

const StudentModel = require('./models/StudentModel');
const routes = require('./routes/Routes');
const Students=require('./routes/Register_login')
const Media = require('./routes/Media')
const Quiz=require('./routes/Quiz')
const Divisions=require('./routes/Divisions')

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
    secret: process.env.JWT_PASS, // Replace with your actual secret key
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days (in milliseconds)
    },
}));


app.use((err, req, res, next) => {
    // Log the error
    console.error(err);

    // Send a generic error response to the client
    res.status(500).json({ error: 'Internal Server Error' });
});


// Routes
app.use('/courses', routes);
app.use('/', Students );
app.use('/media',Media );
app.use('/quiz',Quiz);
app.use('/division',Divisions);


// DB_CONNECTION
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.log('Error connecting to the database:', error);
    });

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server is listening on port', port);
});





