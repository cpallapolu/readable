
import { SET_NAME, SET_PAGE, SET_CATEGORY, SET_POST, CURRENT_EDITING_POST_ID, SET_COMMENT_ID, SET_REDIRECT } from '../actions';

const initialState = {
  name: localStorage.getItem('name') || '',
  page: '',
  category: '',
  post: {},
  currentEditingPostId: '',
  commentId: '',
  doRedirect: false
};

const setName = (state, name) => {
  localStorage.setItem('name', name);
  return Object.assign({}, state, { name });

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

const setCurrentEditingPostId = (state, currentEditingPostId) => {
  return Object.assign({}, state, { currentEditingPostId });
}

const setCommentId = (state, commentId) => {
  return Object.assign({}, state, { commentId });
}

const setRedirect = (state, doRedirect) => {
  return Object.assign({}, state, { doRedirect });
}

function current(state = initialState, action) {
  switch (action.type) {
    case SET_NAME:
      return setName(state, action.name);
    case SET_PAGE:
      return setPage(state, action.page);
    case SET_CATEGORY:
      return setCategory(state, action.category)
    case SET_POST:
      return setPost(state, action.post)
    case CURRENT_EDITING_POST_ID:
      return setCurrentEditingPostId(state, action.currentEditingPostId)
    case SET_COMMENT_ID:
      return setCommentId(state, action.commentId)
    case SET_REDIRECT:
      return setRedirect(state, action.doRedirect)
    default:
      return state;
  }
};

export default current;
