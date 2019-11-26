import { createStore } from 'redux';
import rootReducer from './reducers';

const initialState = {
  test1: ['a', 'b', 'c'],
  test2: [1, 2, 3],
};

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

export default store;
