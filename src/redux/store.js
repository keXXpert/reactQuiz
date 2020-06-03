import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import quizReducer from './reducers/quizReducer';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

    
let reducers = combineReducers({
    quiz: quizReducer
})

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store