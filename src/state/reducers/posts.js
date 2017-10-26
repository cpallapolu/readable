
import _ from 'lodash';

import { GET_POSTS, GET_POST } from '../actions';

const getPosts = (state, posts) => {
  return _.unionBy([], posts, 'id');
};

const getPost = (state, post) => {
  return _.assign({}, state, { selectedPost: post });
};

function posts(state = [], action) {
  switch (action.type) {
    case GET_POSTS:
      return getPosts(state, action.posts);
    case GET_POST:
      return getPost(state, action.post);
    default:
      return state;
  }
};

export default posts;
