import React from "react";
import myCSS from "./QuizList.module.css";
import { NavLink } from 'react-router-dom';

const QuizList = (props) => {
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
