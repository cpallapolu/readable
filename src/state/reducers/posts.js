
import _ from 'lodash';

import { GET_ALL_POSTS, GET_POST } from '../actions';

const getPosts = (state, posts) => {
  const activePosts = posts.filter(post => post.deleted === false);

  return _.assign({}, state, { allPosts: activePosts });
};

const getPost = (state, post) => {
  return _.assign({}, state, { selectedPost: post });
};

function posts(state = { allPosts: [], selectedPost: {} }, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return getPosts(state, action.posts);
    case GET_POST:
      return getPost(state, action.post);
    default:
      return state;
  }
};

export default posts;
