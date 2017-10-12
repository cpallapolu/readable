
import _ from 'lodash';

import { GET_CATEGORIES } from '../actions';

const getCategories = (state, categories) => {
  return _.union(state, categories);
};

function categories(state = [], action) {

  console.log(action);
  switch (action.type) {
    case GET_CATEGORIES:
      return getCategories(state, action.categories);
    default:
      return state;
  }
};

export default categories;
