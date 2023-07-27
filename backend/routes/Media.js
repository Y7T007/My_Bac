const express = require('express');
const { AddNewStudent, getAllStudents, getStudent, Login, getInfos } = require('../controllers/StudentController');
const path = require('path');
const fs = require("fs");
const router = express.Router();

router.get('/:subject/:filename', async (req, res) => {
    try {
        const { subject, filename } = req.params;
        const fileToSend = path.join(__dirname, '../media', 'level1', subject, filename);
        console.log(fileToSend);

        // Check if the file exists before sending
        if (fs.existsSync(fileToSend)) {
            res.sendFile(fileToSend);
        } else {
            res.status(404).send('File not found');
        }
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
