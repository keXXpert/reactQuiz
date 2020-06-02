import React, { useState, useEffect } from "react";
import myCSS from "./Quiz.module.css";
import ActiveQuiz from "./ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "./FinishedQuiz/FinishedQuiz";
import axios from "../../api/api";
import Loader from "../../UI/Loader/Loader";

const Quiz = (props) => {
  const [quiz, setQuiz] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answerState, setAnswerState] = useState(null);
  const [isFinished, setFinished] = useState(false);
  const [results, setResults] = useState({}); // {[id]: 'success' || 'error' }
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/quizes/" + props.match.params.id + ".json"
        );
        setQuiz(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.log("Err: " + err);
      }
    };
    fetchData();
  }, [props.match.params.id]);

  const onAnswerClick = (answerId) => {
    if (answerState) {
      if (answerState.success) return;
    }
    let localResult = results;
    if (quiz[activeQuestion].rightAnswerId === answerId) {
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

  const retryHandler = () => {
    setActiveQuestion(0);
    setAnswerState(null);
    setFinished(false);
    setResults({});
  };

  return (
    <div className={myCSS.Quiz}>
      <div className={myCSS.QuizWrapper}>
        <h1>Answer all questions</h1>
        {isLoading ? (
          <Loader />
        ) : isFinished ? (
          <FinishedQuiz results={results} quiz={quiz} onRetry={retryHandler} />
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
