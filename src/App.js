import React from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import Quiz from "./components/Quiz/Quiz";
import { Route, Switch } from "react-router-dom";
import QuizCreator from './components/QuizCreator/QuizCreator';
import QuizList from './components/QuizList/QuizList';
import Auth from './components/Auth/Auth';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/quiz-creator' component={QuizCreator}/>
        <Route path='/quiz/:id' component={Quiz}/>
        <Route path='/' component={QuizList}/>
      </Switch>
    </Layout>
  );
}



export default App;
