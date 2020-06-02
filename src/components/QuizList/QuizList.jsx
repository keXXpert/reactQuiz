import React, { useEffect } from "react";
import myCSS from "./QuizList.module.css";
import { NavLink } from 'react-router-dom';
import * as axios from 'axios'

const QuizList = (props) => {
  useEffect(()=> {
    axios.get('https://react-quiz-99a01.firebaseio.com/quiz.json')
    .then(response => console.log(response))
  }, [])
  
  const renderQuizes = () => {
      return [1,2,3].map((quiz, index) => <li key={index} className={myCSS.li}>
          <NavLink to={'/quiz/'+ quiz}>Quiz #{quiz}</NavLink>
          </li>)
  };

  return (
    <div className={myCSS.QuizList}>
      <div>
        <h1>Quiz List</h1>
        <ul>{renderQuizes()}</ul>
      </div>
    </div>
  );
};

export default QuizList;
