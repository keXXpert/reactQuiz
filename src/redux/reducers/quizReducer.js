import axios from "../../api/api";

const SET_QUIZES = "quiz/SET-QUIZES";
const SET_LOADING = "quiz/SET-LOADING";
const SET_FETCHING_ERROR = "quiz/SET-FETCHING-ERROR";

const initialState = {
  quizes: [],
  isLoading: false,
  error: null,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUIZES:
      return { ...state, quizes: action.quizes };
    case SET_LOADING:
      return { ...state, isLoading: action.loading };
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

export default quizReducer;
