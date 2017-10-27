
import { SET_PAGE, SET_CATEGORY, SET_POST } from '../actions';

const initialState = {
  page: '',
  category: '',
  post: {}
};

const setPage = (state, page) => {
  return Object.assign({}, state, { page });
};

const setCategory = (state, category) => {
  return Object.assign({}, state, { category });
};

const setPost = (state, post) => {
  return Object.assign({}, state, { post });
};

function current(state = initialState, action) {
  switch (action.type) {
    case SET_PAGE:
      return setPage(state, action.page);
    case SET_CATEGORY:
      return setCategory(state, action.category)
    case SET_POST:
      return setPost(state, action.post)
    default:
      return state;
  }
};

export default current;
