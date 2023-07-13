const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const StudentModel = require('./models/StudentModel');
const routes = require('./routes/Routes');
const cors=require("cors")
// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/courses', routes);

app.post('/add-course', async (req, res) => {
    try {
        const formData = req.body;
        if (!formData.name || !formData.email || !formData.password) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }
        const newRecord = new StudentModel(formData);
        await newRecord.save();
        res.status(200).json({ message: 'Form data saved successfully', formData });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ message: 'Error saving form data' });
    }
});


// DB_CONNECTION
mongoose
    .connect(process.env.MONGODB_URL)
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
