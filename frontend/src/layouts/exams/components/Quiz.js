import React, { useState, useEffect } from "react";
import { useQuizContext } from "../context/QuizContext";
import { useNavigate, useParams } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LivesDisplay from "./LivesDisplay";
import {getElement} from "bootstrap/js/src/util";
import NolLivesRemaining from "./NoLivesRemaining";
import NoLivesRemaining from "./NoLivesRemaining";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


function Quiz() {
  const { subject, level, id } = useParams();
  const navigate = useNavigate();
  const { questions, currentQuestion, setCurrentQuestion } = useQuizContext();
  const [isCorrect, setIsCorrect] = useState();
  const [isVerified, setIsVerified] = useState(false);
  const [isNextButton, setIsNextButton] = useState(false);
  const [isResultButton, setIsResultButton] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [time, setTime] = useState(500);
  const [lifes,setLifes]=useState(sessionStorage.getItem('lifes'));
  const [score,setScore]=useState(sessionStorage.getItem('score'))
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  useEffect(() => {
    // Retrieve currentQuestion and selectedAnswers from local storage
    const storedCurrentQuestion = sessionStorage.getItem('currentQuestion');
    const storedSelectedAnswers = sessionStorage.getItem('selectedAnswers');
    if (storedCurrentQuestion !== null) {
      setCurrentQuestion(Number(storedCurrentQuestion));
    }
    if (storedSelectedAnswers !== null ) {
      setSelectedAnswers(JSON.parse(storedSelectedAnswers));
    }
    // ... (unchanged)
  }, []);

  const selectAnswer = (index) => {
    if (currentQuestion === questions[level].length - 1) {
      setIsNextButton(false);
      setIsResultButton(true);
    } else {
      setIsNextButton(true);
    }
    setSelectedIndex(index);
  };

  const verifyAnswer = (answer, index) => {
    setIsVerified(true);
    setSelectedIndex(index);
  };

  const showResult = (index) => {
    setIsCorrect(questions[level][currentQuestion].answers.findIndex((a) => a.trueAnswer === true));
    setIsVerified(false); // Reset isVerified
    setSelectedIndex(index);
    selectAnswer(index);
  };

  const nextQuestion = (index) => {
    if (currentQuestion >= questions[level].length - 1) {
      addAnswer(index);
      setCurrentQuestion(0);
      setIsResult(true);
    } else {
      setIsCorrect(false);

      setTime(5000);
      setIsNextButton(false);
      addAnswer(index);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedIndex();
    }
  };

  const addAnswer = (index) => {
    const selectedAnswer =
        index !== null
            ? questions[level][currentQuestion].answers[index]
            : {
              answer: "none",
              trueAnswer: false,
            };
    selectedAnswer.trueAnswer === false
        ? (
            () => {
          sessionStorage.setItem('lifes', +lifes - 1);
          setLifes(lifes - 1);
          }
        )() : (
              () => {
          sessionStorage.setItem('score', Number(1+score));
          setScore(score + 1);
          }
        )();

    const newAnswers = [...selectedAnswers, selectedAnswer];
    setSelectedAnswers(newAnswers);
  };



  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (lifes <= 0) {
      setModalShow(true);
    }
  }, [lifes]);



  useEffect(() => {
    // Store currentQuestion and selectedAnswers in local storage
    sessionStorage.setItem('currentQuestion', currentQuestion);
    sessionStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
    // ... (unchanged)
  }, [currentQuestion, selectedAnswers]);


  useEffect(() => {

    const timer = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    time <= 5 ? setIsErrorMessage(true) : setIsErrorMessage(false);
    if (time < 0) {
      nextQuestion(null);
    }
    return () => clearInterval(timer);
  }, [time]);

  return isResult ? (
      navigate(`/quizzes/result/${id}`, {
        state: {
          answers: selectedAnswers,
          questions: questions[level],
        },
      })
  ) : (
    <div>
      <div className="progress-box">
        <div className="progress-top">
          <div className="progress-texts">
            <h2 className="progress-title">Quiz Progress</h2>
            <p className="progress-description">
              You are solving {level} Level words quiz {subject}
            </p>
          </div>
          <div className="progress-icon">
            <LivesDisplay remaining={lifes}/>
          </div>
        </div>
        <div className="progress-bottom">
          <div
            className="progress-circle"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{
              "--value":
                ((currentQuestion + 1) / questions[level].length) * 100,
            }}
          >
            <span className="progress-big">{currentQuestion + 1}</span>
            <span className="progress-mini">/{questions[level].length}</span>
          </div>
          <p className="progress-detail">
            You solve the {currentQuestion + 1}. question out of a total of{" "}
            {questions[level].length} questions
          </p>
        </div>
      </div>
      <div className="question-box">
        <div className="question-text">
          <h2 className="question-title">Question: {currentQuestion + 1}</h2>
          <h3 className="question">
            {questions[level][currentQuestion].question}
          </h3>
        </div>
        <div
          className="progress-circle time"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ "--value": (time / 500) * 100 }}
        >
          <span className="time">{time}</span>
        </div>
      </div>

      <div className="answers-boxes">
        {questions[level][currentQuestion].answers.map((answer, index) => {
          return (
            <label
              onClick={() =>{ if (!isNextButton){ verifyAnswer(answer.answer,index)}}}
              key={index}
              htmlFor={index}
              className={
                (selectedIndex === index  )
                  ? "answer-label selected"
                  : "answer-label"
              }
              id={isCorrect===index
                  ?'correct'
                  :(selectedIndex === index && !isVerified)?"false":null}
            >
              {answer.answer}
              <input type="radio" name="answer" id={index} />
            </label>
          );
        })}
      </div>

      {(isVerified&&!isCorrect) ? (
        <div className="next">
          <button
            onClick={() => showResult(selectedIndex)}
            type="button"
            className="next-btn"
          >
            Verify your Answer
            <div className="icon">
              <i className="bi bi-arrow-right"></i>
            </div>
          </button>
        </div>
      ) : null}
      {isNextButton ? (
            <div className="next">
              <button
                onClick={() => nextQuestion(selectedIndex)}
                type="button"
                className="next-btn"
              >
                Next Question
                <div className="icon">
                  <i className="bi bi-arrow-right"></i>
                </div>
              </button>
            </div>
          ) : null}

      {isResultButton ? (
        <div className="next">
          <button
            onClick={() => nextQuestion(selectedIndex)}
            type="button"
            className="next-btn result-btn"
          >
            See Results
            <div className="icon">
              <i className="bi bi-bar-chart"></i>
            </div>
          </button>
        </div>
      ) : null}

      {isErrorMessage ? (
        <div className="message animation">
          <div className="icon">
            <i className="bi bi-exclamation-triangle"></i>
          </div>
          <span>You must hurry up!</span>
        </div>
      ) : null}
      <>
        <NoLivesRemaining isOpen={modalShow} />
      </>
    </div>
  );
}

export default Quiz;
