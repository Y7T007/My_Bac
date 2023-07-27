const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema(
    {
        answer: {
            type: String,
            required: true,
        },
        trueAnswer: {
            type: Boolean,
            required: true,
        },
    },
    { _id: false }
);

const QuestionSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        answers: [AnswerSchema],
    },
    { _id: false }
);

const QuizSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            required: true,
        },
        course: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        Description: {
            type: String,
            required: true,
        },
        questions: [QuestionSchema],
    },
    { timestamps: true }
);

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;
