import axios from "../../api/api";

const SET_QUIZES = "quiz/SET-QUIZES";
const SET_QUIZ = "quiz/SET-QUIZ";
const SET_LOADING = "quiz/SET-LOADING";
const SET_FINISHED = "quiz/SET-FINISHED";
const SET_ANSWER_STATE = "quiz/SET-ANSWER-STATE";
const SET_ACTIVE_QUESTION = "quiz/SET-ACTIVE-QUESTION";
const SET_RESULTS = "quiz/SET-RESULTS";
const SET_FETCHING_ERROR = "quiz/SET-FETCHING-ERROR";

const initialState = {
  quizes: [],
  isLoading: false,
  error: null,
  quiz: null,
  activeQuestion: 0,
  answerState: null,
  isFinished: false,
  results: {}
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUIZES:
      return { ...state, quizes: action.quizes };
    case SET_QUIZ:
      return { ...state, quiz: action.quiz };
    case SET_LOADING:
      return { ...state, isLoading: action.loading };
    case SET_FINISHED:
      return { ...state, isFinished: action.finished };
    case SET_ANSWER_STATE:
      return { ...state, answerState: action.answerState };
    case SET_ACTIVE_QUESTION:
      return { ...state, activeQuestion: action.activeQuestion };
    case SET_RESULTS:
      return { ...state, results: action.results };
    case SET_FETCHING_ERROR:
      return { ...state, error: action.err };
    default:
      return state;
  }
};

//action creators
export const setQuizes = (quizes) => ({ type: SET_QUIZES, quizes });
export const setLoading = (loading) => ({ type: SET_LOADING, loading });
export const setFetchError = (err) => ({ type: SET_FETCHING_ERROR, err });

export const setQuiz = (quiz) => ({ type: SET_QUIZ, quiz });
export const setFinished = (finished) => ({ type: SET_FINISHED, finished });
export const setAnswerState = (answerState) => ({ type: SET_ANSWER_STATE, answerState });
export const setActiveQuestion = (activeQuestion) => ({ type: SET_ACTIVE_QUESTION, activeQuestion });
export const setResults = (results) => ({ type: SET_RESULTS, results });

//thunk creators
export const fetchQuizes = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get("/quizes.json");
    const quizes = [];
    Object.keys(response.data).forEach((key, index) => {
      quizes.push({ id: key, name: "Quiz #" + (index + 1) });
    });
    dispatch(setQuizes(quizes));
  } catch (err) {
    dispatch(setFetchError(err));
  }
  dispatch(setLoading(false));
};

export const fetchQuizeById = (quizId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get("/quizes/" + quizId + ".json");
    dispatch(setQuiz(response.data));
  } catch (err) {
    dispatch(setFetchError(err));
  }
  dispatch(setLoading(false));
};

export default quizReducer;
