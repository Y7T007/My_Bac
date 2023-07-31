import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import '../exams/assets/css/home.css'
import levels from "../../context/levels";
import api from "../../Axios_api_cfg";

const openFileInNewWindow = (fileUrl) => {
  const server = "http://localhost:3001/";
  const fullPath = `${server}media${fileUrl}`;
  console.log(fullPath);
  window.open(fullPath, '_blank');
};

function HomeCourses() {
  const [courses, setCourses] = useState([]);
  const { subject } = useParams();
  const level = JSON.parse(localStorage.getItem('userInfos')).level;
  const subjectInfos = levels.find((l) => l.levelId === level).subjects.find(l => l.key === subject);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/courses/menu/${level}/${subjectInfos.key}`);
        setCourses(JSON.parse(JSON.stringify(res.data)));
        setIsLoading(false);
      } catch (e) {
        console.log("error : ", e);
        setIsLoading(false); // Set loading to false even in case of an error to prevent infinite loading.
      }
    };

    fetchQuiz();
  }, [level, subjectInfos.key]);

  return (
      <div className="home">
        <h1>{subjectInfos.name}</h1>
        <div className="intro-box">
          <div className="intro-texts">
            <h1 className="intro-title">English Vocabulary Quizzes</h1>
            <p className="intro-description">Choose the course you want to solve</p>
          </div>
          <div className="intro-icon">
            <i className="bi bi-question-circle"></i>
          </div>
        </div>

        <div className="level-boxes">
          {isLoading ? (
              <p>Loading...</p>
          ) : (
              subjectInfos.Chapters.map((Chapter, index) => (
                  <div key={index} className="level-box" style={{ backgroundColor: "#2979FF" }}>
                    <div className="level-text">
                      <h2 className="level-name">{Chapter.name}</h2>
                      <span>Level</span>
                    </div>
                    {courses
                        .filter(q => q.course_name === Chapter.name)
                        .map(q => (
                            <Link
                                key={q.course_id} // Replace q.id with a unique identifier from your data
                                className="level-link"
                                onClick={() => openFileInNewWindow(q.course_path)}
                            >
                              <span style={{ textTransform: "capitalize" }}>{q.course_author_name + ' : ' + q.course_subject}</span> <i className="bi bi-arrow-right"></i>
                            </Link>
                        ))
                    }
                  </div>
              ))
          )}
        </div>
      </div>
  );
}

export default HomeCourses;
