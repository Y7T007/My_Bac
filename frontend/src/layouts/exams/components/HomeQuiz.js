import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
import '../assets/css/home.css'
import levels from "../../../context/levels";
import api from "../../../Axios_api_cfg";

function HomeQuiz() {
  // localStorage.removeItem('tempQuiz')

  const { subject } = useParams();
  const level = JSON.parse(localStorage.getItem('userInfos')).level;
  const subjectInfos= levels.find((l)=> l.levelId === level).subjects.find(l =>l.key===subject);

  const path = `/exams/${subjectInfos.key}/quiz/`;
    const [isFetched,setIsFetched]= useState(false);

    const fetchQuiz = async ()=>{
    try {
      const res =await api.get(`/quiz/${level}/${subjectInfos.key}`);
      const quiz =JSON.stringify(res.data)
      console.log("from hoomequiz :",JSON.parse(quiz))
      localStorage.setItem('tempQuiz',quiz)

      console.log("Result of actual selection : ", JSON.parse(quiz).find(l=>l.level===level))
  }catch (e) {

      console.log("error : ",e)
    }

  }
  if (!isFetched){
    fetchQuiz().then(r => {console.log(r)});
    setIsFetched(true)
  }
  const quiz=JSON.parse(localStorage.getItem('tempQuiz'))

  return (
    <div className="home">
      <h1 >{subjectInfos.name}</h1>
      <div className="intro-box">
        <div className="intro-texts">
          <h1 className="intro-title">English Vocabulary Quizzes</h1>
          <p className="intro-description">Choose the quiz you want to solve</p>
        </div>
        <div className="intro-icon">
          <i className="bi bi-question-circle"></i>
        </div>
      </div>

      <div className="level-boxes">

        {subjectInfos.Chapters.map((Chapter, index) => (
            <div key={index} className="level-box" style={{ backgroundColor: "#2979FF" }}>
              <div className="level-text">
                <h2 className="level-name">{Chapter.name}</h2>
                <span>Level</span>
              </div>
              {quiz
                  .filter(q => q.course === Chapter.name)
                  .map(q => (
                      <Link
                          key={q.id} // Replace q.id with a unique identifier from your data
                          className="level-link"
                          to={`/quizzes/${subjectInfos.key}/${q.name}`}
                      >
                        <span style={{textTransform:"capitalize"}}>{q.difficulty+' : '+q.name}</span> <i className="bi bi-arrow-right"></i>
                      </Link>
                  ))
              }


              {/*<Link className="level-link" to='/exams/quiz/A1'>*/}
              {/*  <span>Medium</span> <i className="bi bi-arrow-right"></i>*/}
              {/*</Link>*/}
              {/*<Link className="disabled" to='/exams/quiz/A1'>*/}
              {/*  <span>Hard</span> <i className="bi bi-arrow-right"></i>*/}
              {/*</Link>*/}
            </div>

        ))}


      </div>
    </div>
  );

}


export default HomeQuiz;
