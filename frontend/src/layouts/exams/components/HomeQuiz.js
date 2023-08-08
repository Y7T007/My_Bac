import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../assets/css/home.css'
import levels from "../../../context/levels";
import api from "../../../Axios_api_cfg";

function HomeQuiz() {
  const { subject } = useParams();
  const level = JSON.parse(localStorage.getItem('userInfos')).level;
  const subjectInfos = levels.find((l) => l.levelId === level).subjects.find(l => l.key === subject);
  const [isFetched, setIsFetched] = useState(false);
  const [actualQuiz, setActualQuiz] = useState([]);

  const fetchQuiz = async () => {
    try {
      const res = await api.get(`/quiz/${level}/${subjectInfos.key}`);
      const quiz = JSON.stringify(res.data);
      console.log("from hoomequiz :", JSON.parse(quiz));

      setActualQuiz(JSON.parse(quiz));
      return quiz
    } catch (e) {
      console.log("error : ", e);
    }
  };
  sessionStorage.setItem('score',0)


  if (!isFetched) {
    fetchQuiz().then(r => { console.log(r);localStorage.setItem('tempQuiz',(r)) });
    setIsFetched(true);
  }

  useEffect(() => {
    const storedSectionData = localStorage.getItem(`sectionData_${subjectInfos.key}`);
    if (storedSectionData) {
      setActualQuiz(JSON.parse(storedSectionData));
    }
  }, [subjectInfos.key]);


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
                {actualQuiz
                    .filter(q => q.course === Chapter.name)
                    .map(q => (
                        <Link
                            key={q.id} // Replace q.id with a unique identifier from your data
                            className="level-link"
                            to={`/quizzes/${subjectInfos.key}/${q.name}/${q._id}`}
                        >
                          <span style={{ textTransform: "capitalize" }}>{q.difficulty + ' : ' + q.name}</span> <i className="bi bi-arrow-right"></i>
                        </Link>
                    ))
                }
              </div>
          ))}
        </div>
      </div>
  );
}

export default HomeQuiz;
