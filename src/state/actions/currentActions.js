
export const SET_NAME = 'SET_NAME';
const setName = (name) => {
  return {
    type: SET_NAME,
    name
  };
};

export const SET_PAGE = 'SET_PAGE';
const setPage = (page) => {
  return {
    type: SET_PAGE,
    page
  }
};

export const SET_CATEGORY = 'SET_CATEGORY';
const setCategory = (category = '') => {
  return {
    type: SET_CATEGORY,
    category
  }
};

export const SET_POST = 'SET_POST';
const setPost = (post = {}) => {
  return {
    type: SET_POST,
    post
  }
};

export const CURRENT_EDITING_POST_ID = 'CURRENT_EDITING_POST_ID';
const setCurrentEditingPostId = (currentEditingPostId) => {
  return {
    type: CURRENT_EDITING_POST_ID,
    currentEditingPostId
  }
}

export const SET_COMMENT_ID = 'SET_COMMENT_ID';
const setCommentId = (commentId) => {
  return {
    type: SET_COMMENT_ID,
    commentId
  }
}

export const SET_REDIRECT = 'SET_REDIRECT';
const setRedirect = (doRedirect) => {
  return {
    type: SET_REDIRECT,
    doRedirect
  }
}

export { setName, setPage, setCategory, setPost, setCurrentEditingPostId, setCommentId, setRedirect };
