import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/home.css";
import levels from "../../../context/levels";

function Home() {
    const level = JSON.parse(localStorage.getItem('userInfos')).level;
    console.log(level)

    const subjects = levels.find((l) => l.levelId === level).subjects;
    console.log(subjects);


    const levelBoxes = [
    { name: "Mathematics", link: "/exams/Mathematics/", color: "#1e5aff" },
    { name: "Physics", link: "/exams/quiz/A2", color: "#cc3434" },
    { name: "French", link: "/exams/quiz/B1", color: "#cc9250" },
  ];
    sessionStorage.setItem('lifes',5)

  return (
      <div className="home">
        <div className="intro-box">
          <div className="intro-texts">
            <h1 className="intro-title">{levels.find(l=>l.levelId===level).name} Quizzes</h1>
            <p className="intro-description">Choose the quiz you want to solve</p>
          </div>
          <div className="intro-icon">
            <i className="bi bi-question-circle"></i>
          </div>
        </div>

        <div className="level-boxes">
          {subjects.map((subject) => (
              <div
                  key={subject.key}
                  className="level-box"
                  style={{ backgroundColor: subject.color }}
              >
                <div className="level-text">
                  <h2 className="level-name">{subject.name}</h2>
                  <span>{levels.find(l=>l.levelId===level).name}</span>
                </div>
                <Link className="level-link" to={subject.key}>
                  <span>Show Quiz</span> <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
          ))}
        </div>

      </div>
  );
}

export default Home;
