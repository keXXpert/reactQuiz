import React, { useEffect, useState } from "react";
import myCSS from "./QuizList.module.css";
import { NavLink } from "react-router-dom";
import Loader from "../../UI/Loader/Loader";
import axios from "../../api/api";

const QuizList = (props) => {
  const [quizes, setQuizes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/quizes.json");
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
