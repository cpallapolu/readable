
import _ from 'lodash';

import { GET_ALL_CATEGORIES } from '../actions';

const getCategories = (state, categories) => {
  return _.unionBy([], state, categories, 'name');
};

function categories(state = [], action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return getCategories(state, action.categories);
    default:
      return state;
  }
};

export default categories;
