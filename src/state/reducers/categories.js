
import _ from 'lodash';

import { GET_ALL_CATEGORIES, SET_SELECTED_CATEGORY } from '../actions';

const getCategories = (state, categories) => {
  return _.assign({}, state, { allCategories: categories });
};

const setSelectedCategory = (state, name) => {
  const selectedCategory = _.find(state.allCategories, { name }) || {};

  return _.assign({}, state, { selectedCategory });
}

function categories(state = { allCategories: [], selectedCategory: {} }, action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return getCategories(state, action.categories);
    case SET_SELECTED_CATEGORY:
      return setSelectedCategory(state, action.name);
    default:
      return state;
  }
};

export default categories;
