
import _  from 'lodash';

import { SET_PAGE, SET_CATEGORY } from '../actions';

const setPage = (state, page) => {
  return _.assign({}, state, { page });
};

const setCategory = (state, category) => {
  return _.assign({}, state, { category });
};

function current(state = {}, action) {
  switch (action.type) {
    case SET_PAGE:
      return setPage(state, action.page);
    case SET_CATEGORY:
      return setCategory(state, action.category)
    default:
      return state;
  }
};

export default current;
