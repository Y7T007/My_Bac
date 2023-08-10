const {Quiz,QuizRecord} = require('../models/QuizModel');
const jwt = require("jsonwebtoken");
const Course = require("../models/CourseModel");
const Student = require("../models/StudentModel");

let quizReqCount=0 ;

// Get a certain quiz by ID
const getQuiz = async (req, res) => {
    try {
        const id = req.params.id;
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({ message: 'The quiz is not found' });
        }
        res.status(200).json(quiz);
    } catch (e) {
        console.log(e);
        res.status(500).send('An error occurred while fetching the quiz');
    }
};
const getQuizByLevel = async (req, res) => {
    try {
        const level = req.params;
        const quiz = await Quiz.find({level:level});
        if (!quiz) {
            return res.status(404).json({ message: 'The quiz is not found' });
        }
        res.status(200).json(quiz);
    } catch (e) {
        console.log(e);
        res.status(500).send('An error occurred while fetching the quiz');
    }
};
const getQuizByLevelBySubject = async (req, res) => {
    try {
        const {level,subject} = req.params;
        const quiz = await Quiz.find({level:level,subject:subject});
        if (!quiz) {
            return res.status(404).json({ message: 'The quiz is not found' });
        }
        quizReqCount=quizReqCount+1;
        console.log('Number of quiz requests : ',quizReqCount);
        res.status(200).json(quiz);
    } catch (e) {
        console.log(e);
        res.status(500).send('An error occurred while fetching the quiz');
    }
};
const getAllQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.find();
        if (!quiz) {
            return res.status(404).json({ message: 'no quiz is not found' });
        }
        res.status(200).json(quiz);
    } catch (e) {
        console.log(e);
        res.status(500).send('An error occurred while fetching the quiz');
    }
};

const createQuiz = async (req, res) => {
    try {
        const quizData = req.body;
        const quiz = new Quiz(quizData);
        await quiz.save();
        res.status(201).json({ message: 'Quiz created successfully', quiz });
    } catch (e) {
        console.log(e);
        res.status(500).send('An error occurred while creating the quiz');
    }
};

// Import QuizRecord and any necessary modules
// Import QuizRecord and any necessary modules

const isRecordExist = async (StudentId, QuizId) => {
    try {


        return await QuizRecord.findOne({
            StudentId,
            QuizId,
        });
    } catch (error) {
        // Handle error here if needed
    }
};

const saveRecord = async (req, res) => {
    try {
        const recordData = req.body;
        const existingRecord = await isRecordExist(recordData.StudentId, recordData.QuizId);

        if (!existingRecord) {
            const record = new QuizRecord(recordData);
            await record.save();
            res.status(202).json({ message: 'Record saved successfully' });
        } else {
            const currentTime = new Date();
            const timeDiff = currentTime - existingRecord.updatedAt;

            if (timeDiff > 3600000) { // 3600000 milliseconds = 1 hour
                existingRecord.Score < recordData.Score?(  ()=>{
                existingRecord.Score = recordData.Score;})():(console.log('score present is bigger'))
                await existingRecord.save();
                res.status(202).json({ message: 'Record updated successfully' });
            } else {
                res.status(204).send({ message: 'You cannot update the score within one hour' });
            }
        }
    } catch (error) {
        res.status(501).json({ message: 'Error: Record not saved or updated in the database' });
    }
};

const getRecord= async (req, res)=>{
    try {
        // console.log(req)
        const token = req.headers.authorization.split(' ')[1]; // Extract the token from headers

        try {
            const decoded = jwt.verify(token, process.env.JWT_PASS); // Verify the token

            req.userId = decoded.userId; // Store the decoded user ID in the request object
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                // Handle expired token error
                return res.status(401).json({ message: 'Token expired' });
            }

            console.log('Error:', err);
        }

        const userId = req.userId;
        console.log(userId);

        const records = await QuizRecord.find({StudentId:userId});


        res.status(200).send(records);
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { getQuiz , createQuiz ,getAllQuiz,getQuizByLevel,getQuizByLevelBySubject,saveRecord,getRecord};
