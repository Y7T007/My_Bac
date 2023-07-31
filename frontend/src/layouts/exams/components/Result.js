import React, {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import Image from "../assets/bg.png";
import axios_api_cfg from "../../../Axios_api_cfg";
import api from "../../../Axios_api_cfg";
function Result() {
  const { id } = useParams();

  const location = useLocation();
  const allAnswers = location.state.answers;
  const allQuestions = location.state.questions;
  const [userId, setUserId] = useState(0);
  const [recordData, setRecordData] = useState({
    StudentId: '',
    Score: 0,
  });
  const [score, setScore] = useState(0);
  const [isRecordSaved, setIsRecordSaved] = useState(false);

  let percentile = 0;
  allAnswers.forEach((item) => {
    if (item.trueAnswer) {
      percentile += 1;
      console.log(percentile);
    }
  });

  useEffect(() => {
    setUserId();
    console.log(userId)
    setScore(percentile);
  }, [percentile]);

  useEffect(() => {
    if (!isRecordSaved) {

      setIsRecordSaved(true);
    }
  }, [isRecordSaved, userId, percentile]);

  console.log(JSON.parse(localStorage.getItem('tempQuiz')))

  useEffect( () => {
    if (isRecordSaved) {
       api.post('/quiz/save-record', {
         StudentId: JSON.parse(localStorage.getItem('userInfos')).id,
         Score: percentile,
         QuizId:id,
       }).then(r => {
          if (r.status==204){
            console.log("you cannot pass another quiz now ")
          }

       });

    }
  }, [isRecordSaved, recordData]);

  localStorage.removeItem('tempQuiz');
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
      window.location.href = "/quizzes";


      // Perform any necessary actions before the page is unloaded here.
      // For example, you can save data to the server or perform cleanup tasks.
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);






  return (
    <div className="result">
      <div className="result-box">
        <div className="result-bg">
          <span className="percentile">
            {Math.round((percentile / allQuestions.length) * 100)}%
          </span>
          <img src={Image} alt="result" />
        </div>
        <p className="result-detail">
          You answered {percentile} out of {allQuestions.length} questions
          correctly!
        </p>
        <Link to="/exams" className="new-quiz">
          Start a new quiz!
        </Link>
      </div>
      <h2 className="check-answers-title">Check Correct Answers</h2>
      <div className="check-answers-boxes">
        {allQuestions.map((item, key) => {
          console.log();
          return (
            <div
              key={key}
              className={
                allAnswers[key].trueAnswer
                  ? "check-answer-box correct"
                  : "check-answer-box wrong"
              }
            >
              <div className="check-answer-top">
                <div className="check-texts">
                  <p className="check-answer-count">Question: {key + 1}</p>
                  <h3 className="check-answer-question">{item.question}</h3>
                </div>
                <div className="check-icon">
                  <i
                    className={
                      allAnswers[key].trueAnswer ? "bi bi-check" : "bi bi-x"
                    }
                  ></i>
                </div>
              </div>
              <div className="check-answer-bottom">
                <div className="answer-box">
                  <span className="answer-title">Your Answer</span>
                  <span className="answer-text">{allAnswers[key].answer}</span>
                </div>
                <div className="answer-box">
                  <span className="answer-title">Correct Answer</span>
                  <span className="answer-text">
                    {item.answers.map((ans) => {
                      return ans.trueAnswer ? ans.answer : null;
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Result;
