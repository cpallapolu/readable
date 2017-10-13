
import { combineReducers } from 'redux';

//Reducers
import categories from './categories';
import posts from './posts';

export default combineReducers({
  categories,
  posts
});
