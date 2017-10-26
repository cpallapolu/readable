
import { combineReducers } from 'redux';

//Reducers
import categories from './categories';
import posts from './posts';
import current from './current';

export default combineReducers({
  categories,
  posts,
  current
});
