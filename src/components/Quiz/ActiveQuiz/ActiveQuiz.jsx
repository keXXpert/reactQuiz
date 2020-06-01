import React from "react";
import myCSS from "./ActiveQuiz.module.css";
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = ({question, answers, activeQuestion, onAnswerClick, quizLength, answerState}) => (
  <div className={myCSS.ActiveQuiz}>
    <p className={myCSS.Question}>
      <span>
        <strong>{activeQuestion}.</strong>&nbsp;
        {question}
      </span>
      <small>{activeQuestion} of {quizLength}</small>
    </p>
    <AnswersList answers={answers} onAnswerClick={onAnswerClick} answerState={answerState}/>
  </div>
);

export default ActiveQuiz;
