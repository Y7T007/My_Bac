const express = require("express");
const { getQuiz,getPerformance, createQuiz, getAllQuiz,getQuizByLevel,getQuizByLevelBySubject,saveRecord,getRecord} = require('../controllers/QuizController');
const router = express.Router();

// Get Quizzes
router.get('/id:id', getQuiz);
router.get('/', getAllQuiz);
router.get('/getquiz/:level', getQuizByLevel);
router.get('/getquiz/:level/:subject', getQuizByLevelBySubject);
// Post Quizzes
router.post('/create-quiz', createQuiz);
// Post/Get Records
router.post('/records/save-record',saveRecord);
router.get('/records/get-records',getRecord);
router.get('/records/get-performance',getPerformance);


module.exports = router;
