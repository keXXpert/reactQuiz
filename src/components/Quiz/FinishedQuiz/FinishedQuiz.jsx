import React from "react";
import myCSS from "./FinishedQuiz.module.css";

const FinishedQuiz = ({ results, quiz, onRetry }) => {
  const successCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === "success") {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className={myCSS.FinishedQuiz}>
      <ul>
        {quiz.map((question, index) => {
          const cls = [
            "fa",
            results[question.id - 1] === "error" ? "fa-times" : "fa-check",
            myCSS[results[question.id - 1]],
          ];
          return (
            <li key={index}>
              <strong>{index + 1}</strong>.&nbsp;{question.question}{" "}
              <i className={cls.join(" ")} />
            </li>
          );
        })}
      </ul>
      <p>
        You answered correctly on {successCount} of {quiz.length} questions!
      </p>
      <div>
        <button onClick={onRetry}>Retry</button>
      </div>
    </div>
  );
};

export default FinishedQuiz;
