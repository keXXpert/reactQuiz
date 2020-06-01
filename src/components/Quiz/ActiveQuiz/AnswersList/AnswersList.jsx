import React from "react";
import myCSS from "./AnswersList.module.css";
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = ({answers, onAnswerClick, answerState}) => 
<ul className={myCSS.AnswersList}>
    {answers.map((answer, index) => (
        <AnswerItem key={index+answer.text} answer={answer}
         onAnswerClick={onAnswerClick}
         state={(answerState && answerState.id === answer.id) ? answerState.success : null} />
    ))}
</ul>;

export default AnswersList;
