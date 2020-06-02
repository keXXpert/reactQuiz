import React, { useEffect, useState } from "react";
import myCSS from "./QuizList.module.css";
import { NavLink } from "react-router-dom";
import * as axios from "axios";
import Loader from "../../UI/Loader/Loader";

const QuizList = (props) => {
  const [quizes, setQuizes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://react-quiz-99a01.firebaseio.com/quizes.json"
        );
        const localQuizes = [];
        Object.keys(response.data).forEach((key, index) => {
          localQuizes.push({ id: key, name: "Quiz #" + (index + 1) });
        });
        setQuizes(localQuizes);
        setLoading(false);
      } catch (err) {
        console.log("Err: " + err);
      }
    };
    fetchData();
  }, []);

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
        {isLoading ? <Loader /> : <ul>{renderQuizes()}</ul>}
      </div>
    </div>
  );
};

export default QuizList;
