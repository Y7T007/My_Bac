const Quiz = require('../models/QuizModel');

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
        const level = req.param('level');
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

module.exports = { getQuiz , createQuiz ,getAllQuiz,getQuizByLevel,getQuizByLevelBySubject};
