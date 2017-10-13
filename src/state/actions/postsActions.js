
import api from '../api';

export const GET_POSTS = 'GET_POSTS';
const getPosts = (posts) => {
  return {
    type: GET_POSTS,
    posts
  };
};

export const FETCH_POSTS = 'FETCH_POSTS';
const fetchPosts = () => (dispatch) => {
  api('/posts', 'GET')
    .then((response) => {
      dispatch(getPosts(response))
    });
};

export { fetchPosts };
