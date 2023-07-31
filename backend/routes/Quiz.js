const express = require("express");
const { getQuiz, createQuiz, getAllQuiz,getQuizByLevel,getQuizByLevelBySubject,saveRecord} = require('../controllers/QuizController');
const router = express.Router();

router.get('/id:id', getQuiz);
router.get('/', getAllQuiz);
router.get('/:level', getQuizByLevel);
router.get('/:level/:subject', getQuizByLevelBySubject);
router.post('/save-record',saveRecord);
router.post('/create-quiz', createQuiz);

module.exports = router;
