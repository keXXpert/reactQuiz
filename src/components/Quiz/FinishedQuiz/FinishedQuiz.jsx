import React from "react";
import myCSS from "./FinishedQuiz.module.css";

const FinishedQuiz = ({ results, quiz }) => {
  return (
    <div className={myCSS.FinishedQuiz}>
      <ul>
        {quiz.map((question, index) => {
          const cls = [
            "fa",
            results[question.id-1] === "error" ? "fa-times" : "fa-check",
            myCSS[results[question.id-1]],
          ];
          return (
            <li key={index}>
              <strong>{index + 1}</strong>.&nbsp;{question.question}{" "}
              <i className={cls.join(" ")} />
            </li>
          );
        })}
        {/* <li><strong>1. </strong>How are you? <i className={'fa fa-times '+myCSS.error}/></li>
                <li><strong>2. </strong>How is it going? <i className={'fa fa-check '+myCSS.success}/></li>
                <li><strong></strong></li>
                <li><strong></strong></li> */}
      </ul>
      <p>You answered correctly on N of NN questions!</p>
      <div>
        <button>Retry</button>
      </div>
    </div>
  );
};

export default FinishedQuiz;
