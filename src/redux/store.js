import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import quizReducer from './reducers/quizReducer';
import createReducer from './reducers/createReducer';
import authReducer from './reducers/authReducer';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

    
let reducers = combineReducers({
    quiz: quizReducer,
    create: createReducer,
    auth: authReducer
})

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store