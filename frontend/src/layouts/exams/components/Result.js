import React, {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import Image from "../assets/bg.png";
import axios_api_cfg from "../../../Axios_api_cfg";
import api from "../../../Axios_api_cfg";

import PropTypes from 'prop-types';
import { Box, styled } from '@mui/system';
import Modal from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/base/Button';



function Result() {
  const { id } = useParams();

  const location = useLocation();
  const allAnswers = location.state.answers;
  const allQuestions = location.state.questions;
  const [userId, setUserId] = useState(0);
  const [recordData, setRecordData] = useState({
    StudentId: JSON.parse(localStorage.getItem('userInfos')).id,
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


  useEffect( () => {
    if (isRecordSaved) {
      console.log(recordData,JSON.parse(localStorage.getItem('userInfos')).id)
      percentile= (percentile /allAnswers.length)*20; 
       api.post('/quiz/records/save-record', {
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



  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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
        <Link to="/quizzes" className="new-quiz">
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
      <TriggerButton onClick={handleOpen}>Open modal</TriggerButton>
      <StyledModal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h2 id="transition-modal-title">Text in a modal</h2>
            <span id="transition-modal-description" style={{ marginTop: 16 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </span>
          </Box>
        </Fade>
      </StyledModal>
    </div>
  );
}
const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
      <Fade in={open}>
        <div ref={ref} {...other} />
      </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const blue = {
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: '12px',
  padding: '16px 32px 24px 32px',
  backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
  boxShadow: `0px 2px 24px ${theme.palette.mode === 'dark' ? '#000' : '#383838'}`,
});

const TriggerButton = styled(Button)(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 6px 12px;
  line-height: 1.5;
  background: transparent;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[100] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:focus-visible {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  `,
);

export default Result;
