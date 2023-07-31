const {Quiz,QuizRecord} = require('../models/QuizModel');

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

// test if a record is saved less that one hour:
const IsRecordExist=async (StudentId,QuizId)=>{
    try{
        const oneHourAgo = new Date();
        oneHourAgo.setHours(oneHourAgo.getHours() - 1);

        const response = await QuizRecord.find({
            StudentId: StudentId,
            QuizId: QuizId,
            timeSaved: { $gte: oneHourAgo },
        });
        return response;
    }catch (e) {

    }
}
const saveRecord = async (req,res)=>{
    try{
        const recordData=req.body;

        const record=new QuizRecord(recordData);
        if (!IsRecordExist(req.body.StudentId,req.body.QuizId)){
            await record.save();
            res.status(202).json({message : 'record saved successfully'})
        }else {
            res.status(204).send({message: 'You cannot pass the same quiz in an interval of time of one hour'})
        }
    }catch (e) {
        res.status(501).json({message : 'errrroor : nothing saved to the db'})
    }
}


module.exports = { getQuiz , createQuiz ,getAllQuiz,getQuizByLevel,getQuizByLevelBySubject,saveRecord};
