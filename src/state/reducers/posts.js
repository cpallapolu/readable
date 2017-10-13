
import _ from 'lodash';

import { GET_POSTS } from '../actions';

const getPosts = (state, posts) => {
  return _.union([], posts);
};

function posts(state = [], action) {
  switch (action.type) {
    case GET_POSTS:
      return getPosts(state, action.posts);
    default:
      return state;
  }
};

export default posts;
