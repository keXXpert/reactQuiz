import axios from "axios";

const SET_TOKEN = "auth/SET-TOKEN";
const LOGOUT = "auth/LOGOUT";

const initialState = {
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.token };
    case LOGOUT:
      return { ...state, token: null };
    default:
      return state;
  }
};

// action creators
export const authSuccess = (token) => ({ type: SET_TOKEN, token });
export const logoutAC = () => ({ type: LOGOUT });

// thunk creators
export const auth = (email, password, isLoggingIn) => async (dispatch) => {
  const authData = { email, password, returnSecureToken: true };
  const requestURL = isLoggingIn
    ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXjwr7aTPS0gE5wcNF7hV_aauaB10oitw"
    : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXjwr7aTPS0gE5wcNF7hV_aauaB10oitw";
  try {
    const { data } = await axios.post(requestURL, authData);
    console.log(data);

    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );
    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);
    localStorage.setItem("expirationDate", expirationDate);
    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
  } catch (err) {
    console.log("Register error: " + err);
  }
};

export const logout = () => (dispatch) => {
  dispatch(logoutAC());
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
};

export const autoLogout = (timeout) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, timeout * 1000);
};

export const autoLogin = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
      dispatch(
        autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
      );
    }
  }
};

export default authReducer;
