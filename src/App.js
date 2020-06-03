import React, { useEffect } from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import Quiz from "./components/Quiz/Quiz";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import QuizCreator from "./components/QuizCreator/QuizCreator";
import QuizList from "./components/QuizList/QuizList";
import Auth from "./components/Auth/Auth";
import { connect } from "react-redux";
import Logout from "./components/Logout/Logout";
import { autoLogin } from './redux/reducers/authReducer';

function App({ isAuthed, autoLogin }) {
  useEffect(()=> {
    autoLogin()
  },[])
  
  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/quiz/:id" component={Quiz} />
      <Route path="/" exact component={QuizList} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthed) {
    routes = (
      <Switch>
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Layout>
      {routes}
    </Layout>
  );
}

function mapStateToProps(state) {
  return { isAuthed: !!state.auth.token };
}

export default withRouter(connect(mapStateToProps, {autoLogin})(App));
