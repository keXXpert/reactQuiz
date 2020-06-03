import React, { useEffect } from "react";
import myCSS from "./Quiz.module.css";
import ActiveQuiz from "./ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "./FinishedQuiz/FinishedQuiz";
import Loader from "../../UI/Loader/Loader";
import { connect } from "react-redux";
import {
  fetchQuizeById,
  setFinished,
  setAnswerState,
  setActiveQuestion,
  setResults,
} from "../../redux/reducers/quizReducer";

const Quiz = ({
  quiz,
  activeQuestion,
  answerState,
  isFinished,
  results,
  isLoading,
  ...props
}) => {
  useEffect(() => {
    async function fetchData() {
      props.fetchQuizeById(props.match.params.id);
    }
    fetchData();
  }, [props.match.params.id]);

  useEffect(() => {
    retryHandler()
  }, []);

  const onAnswerClick = (answerId) => {
    if (answerState) {
      if (answerState.success) return;
    }
    let localResult = results;
    if (quiz[activeQuestion].rightAnswerId === answerId) {
      props.setAnswerState({ id: answerId, success: true });
      if (localResult[activeQuestion] !== "error") {
        localResult[activeQuestion] = "success";
        props.setResults(localResult);
      }
      const timeout = window.setTimeout(() => {
        if (isQuizFinished()) {
          console.log("Finished", results);
          props.setFinished(true);
        } else {
          props.setActiveQuestion(activeQuestion + 1);
        }
        props.setAnswerState(null);
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      localResult[activeQuestion] = "error";
      props.setResults(localResult);
      props.setAnswerState({ id: answerId, success: false });
    }
  };

  const isQuizFinished = () => {
    return activeQuestion === quiz.length - 1;
  };

  const retryHandler = () => {
    props.setActiveQuestion(0);
    props.setAnswerState(null);
    props.setFinished(false);
    props.setResults({});
  };

  return (
    <div className={myCSS.Quiz}>
      <div className={myCSS.QuizWrapper}>
        <h1>Answer all questions</h1>
        {isLoading || !quiz ? (
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

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz.quiz,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    isFinished: state.quiz.isFinished,
    results: state.quiz.results,
    isLoading: state.quiz.isLoading,
  };
};

export default connect(mapStateToProps, {
  fetchQuizeById,
  setFinished,
  setAnswerState,
  setActiveQuestion,
  setResults,
})(Quiz);
