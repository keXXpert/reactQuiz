import axios from "../../api/api";

const SET_QUIZ = "create/SET-QUIZ";

const initialState = {
  quiz: [],
};

const createReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUIZ:
      return { ...state, quiz: action.quiz };

    default:
      return state;
  }
};

export const setQuiz = (quiz) => ({ type: SET_QUIZ, quiz });

export const addNewQuiz = (quiz) => async (dispatch) => {
  try {
    await axios.post("/quizes.json", quiz);
    dispatch(setQuiz([]));
  } catch (err) {
    console.log("Error: " + err);
  }
};

export default createReducer;
