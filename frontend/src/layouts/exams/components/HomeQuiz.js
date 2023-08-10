import React, { useEffect, useState } from "react";
import {json, Link, useParams} from "react-router-dom";
import '../assets/css/home.css'
import levels from "../../../context/levels";
import api from "../../../Axios_api_cfg";
import quiz from "./Quiz";

function HomeQuiz() {
  const { subject } = useParams();
  const level = JSON.parse(localStorage.getItem('userInfos')).level;
  const subjectInfos = levels.find((l) => l.levelId === level).subjects.find(l => l.key === subject);
  const [isFetched, setIsFetched] = useState(false);
  const [actualQuiz, setActualQuiz] = useState([]);
  const [StudentRecords, setStudentRecords] = useState([]);

  const fetchQuiz = async () => {
    try {
      const res = await api.get(`/quiz/getquiz/${level}/${subjectInfos.key}`);
      const quiz = JSON.stringify(res.data);
      console.log("from hoomequiz :", JSON.parse(quiz));

      setActualQuiz(JSON.parse(quiz));
      return quiz
    } catch (e) {
      console.log("error : ", e);
    }
  };
  const fetchStudentRecords = async () => {
    try {
      const res = await api.get(`/quiz/records/get-records`);
      const records = JSON.stringify(res.data);
      setStudentRecords(JSON.parse(records))
      console.log(StudentRecords)
      return records
    } catch (e) {
      console.log("error : ", e);
    }
  };
  sessionStorage.setItem('score',0);
  sessionStorage.setItem('currentQuestion', 0);
  sessionStorage.removeItem('selectedAnswers');


  if (!isFetched) {
    fetchQuiz().then(r => { console.log(r);localStorage.setItem('tempQuiz',(r)) });
    fetchStudentRecords().then(r => console.log(r) )
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
                {( ()=>{
                    const quiz_data=actualQuiz.filter(q => q.course === Chapter.name)
                  console.log('the following are : ', quiz_data)
                  const allLinks=[];
                  let isDisabled=false;
                  let linkEnabled=false;

                  for (let i = 1; i < 6; i++) {

                    const q = quiz_data.find(q => q.difficulty === `level${i}`);
                    if (q){
                      linkEnabled=false
                    console.log('q',i,q)
                    const record = StudentRecords.find(r => r.QuizId === q._id);
                      console.log('record',i,record)


                    if (!isDisabled ){
                      linkEnabled=true;
                    }
                     isDisabled = !(record && record.Score>=10);
                      console.log(i,isDisabled)

                    const linkText = `Level ${i}`;
                    const levelName = linkEnabled ? q.name : `${q.name}`;
                    const classNamer=linkEnabled?"level-link":"level-link disabled";
                    const linkIcon=linkEnabled?"bi bi-unlock":"bi bi-lock";
                    allLinks.push(
                        <>
                          <Link
                              key={q.id}
                              className={classNamer}
                              to={`/quizzes/${subjectInfos.key}/${q.name}/${q._id}`}
                          >
                                <span style={{ textTransform: "capitalize" }}>
                                  {linkText}: {levelName}
                                </span>{" "}
                            <i className={linkIcon}></i>
                            <span>
                              {record?record.Score+'/20':''}
                            </span>
                          </Link>
                        </>
                    )
                    }
                  }

                  return(
                      <>
                        {allLinks}
                      </>
                  );
                })()}
                {/*{*/}
                {/*  actualQuiz*/}
                {/*      .filter(q => q.course === Chapter.name)*/}
                {/*      .map(q => {*/}
                {/*        const record = StudentRecords.find(r => r.QuizId === q._id);*/}

                {/*        let linkText = "";*/}
                {/*        let linkEnabled = false;*/}

                {/*        switch (q.difficulty) {*/}
                {/*          case "level1":*/}
                {/*            linkText = "Level 1";*/}
                {/*            linkEnabled = true;*/}

                {/*            break;*/}
                {/*          case "level2":*/}
                {/*            linkText = "Level 2";*/}
                {/*            linkEnabled = record && record.Score >= 10;*/}
                {/*            break;*/}
                {/*          case "level3":*/}
                {/*            linkText = "Level 3";*/}
                {/*            linkEnabled = record && record.Score >= 10;*/}
                {/*            break;*/}

                {/*          case "level4":*/}
                {/*            linkText = "Level 4";*/}
                {/*            linkEnabled = record && record.Score >= 10;*/}
                {/*            break;*/}

                {/*          case "level5":*/}
                {/*            linkText = "Level 5";*/}
                {/*            linkEnabled = record && record.Score >= 10;*/}
                {/*            break;*/}

                {/*          default:*/}
                {/*            break;*/}
                {/*        }*/}

                {/*        const levelName = linkEnabled ? q.name : `${q.name}`;*/}
                {/*        const linkIcon=linkEnabled?"bi bi-unlock":"bi bi-lock";*/}
                {/*        if (linkEnabled) {*/}
                {/*          return (*/}
                {/*              <Link*/}
                {/*                  key={q.id}*/}
                {/*                  className="level-link"*/}
                {/*                  to={`/quizzes/${subjectInfos.key}/${q.name}/${q._id}`}*/}
                {/*              >*/}
                {/*                <span style={{ textTransform: "capitalize" }}>*/}
                {/*                  {linkText}: {levelName}*/}
                {/*                </span>{" "}*/}
                {/*                <i className={linkIcon}></i>*/}
                {/*              </Link>*/}
                {/*          );*/}
                {/*        }*/}

                {/*        return (*/}
                {/*            <div key={q.id} className="level-link locked-level disabled">*/}
                {/*              <span style={{ textTransform: "capitalize" }}>{linkText} : {levelName}</span>{" "}*/}
                {/*              <i className={linkIcon}></i>*/}
                {/*            </div>*/}
                {/*        );*/}
                {/*      })*/}
                {/*}*/}


              </div>
          ))}
        </div>
      </div>
  );
}

export default HomeQuiz;