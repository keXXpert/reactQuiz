import React, { useState } from "react";
import myCSS from "./Quiz.module.css";
import ActiveQuiz from "./ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "./FinishedQuiz/FinishedQuiz";

const initialQuiz = [
  {
    question: "What color is the sky?",
    id: 1,
    rightAnswerId: 2,
    answers: [
      { id: 1, text: "Green" },
      { id: 2, text: "Blue" },
      { id: 3, text: "Red" },
      { id: 4, text: "Yellow" },
    ],
  },
  {
    question: "What is the capital of United Kingdom?",
    id: 2,
    rightAnswerId: 3,
    answers: [
      { id: 1, text: "Paris" },
      { id: 2, text: "New York" },
      { id: 3, text: "London" },
      { id: 4, text: "Rome" },
    ],
  },
];

const Quiz = (props) => {
  const [quiz, setQuiz] = useState(initialQuiz);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answerState, setAnswerState] = useState(null);
  const [isFinished, setFinished] = useState(false);
  const [results, setResults] = useState({}); // {[id]: 'success' || 'error' }

  const onAnswerClick = (answerId) => {
    if (answerState) {
      if (answerState.success) return;
    }
    let localResult = results;
    if (quiz[activeQuestion].rightAnswerId === answerId) {
      debugger;
      setAnswerState({ id: answerId, success: true });
      if (localResult[activeQuestion] !== "error") {
        localResult[activeQuestion] = "success";
        setResults(localResult);
      }
      const timeout = window.setTimeout(() => {
        if (isQuizFinished()) {
          console.log("Finished", results);
          setFinished(true);
        } else {
          setActiveQuestion(activeQuestion + 1);
        }
        setAnswerState(null);
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      localResult[activeQuestion] = "error";
      setResults(localResult);
      setAnswerState({ id: answerId, success: false });
    }
  };

  const isQuizFinished = () => {
    return activeQuestion === quiz.length - 1;
  };

  return (
    <div className={myCSS.Quiz}>
      <div className={myCSS.QuizWrapper}>
        <h1>Answer all questions</h1>
        {isFinished ? (
          <FinishedQuiz results={results} quiz={quiz}/>
        ) : (
          <ActiveQuiz
            question={quiz[activeQuestion].question}
            answers={quiz[activeQuestion].answers}
            onAnswerClick={onAnswerClick}
            quizLength={quiz.length}
            activeQuestion={activeQuestion + 1}
            answerState={answerState}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
