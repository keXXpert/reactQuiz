import React, { useEffect } from "react";
import myCSS from "./QuizList.module.css";
import { NavLink } from "react-router-dom";
import Loader from "../../UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizes } from '../../redux/reducers/quizReducer';

const QuizList = ({quizes, isLoading, fetchQuizes}) => {
  useEffect(() => fetchQuizes(), []);

  const renderQuizes = () => {
    return quizes.map((quiz) => (
      <li key={quiz.id} className={myCSS.li}>
        <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
      </li>
    ));
  };

  return (
    <div className={myCSS.QuizList}>
      <div>
        <h1>Quiz List</h1>
        {isLoading && quizes.length === 0 ? <Loader /> : <ul>{renderQuizes()}</ul>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.quiz.isLoading,
    quizes: state.quiz.quizes
  };
};

export default connect(mapStateToProps, {fetchQuizes})(QuizList);
