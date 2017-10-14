
import _ from 'lodash';

import api from '../api';

import { setSelectedCategory } from './';

export const GET_ALL_POSTS = 'GET_ALL_POSTS';
const getPosts = (posts) => {
  return {
    type: GET_ALL_POSTS,
    posts
  };
};

export const FETCH_ALL_POSTS = 'FETCH_ALL_POSTS';
const fetchPosts = () => (dispatch) => {
  api('/posts', 'GET')
    .then((posts) => {
      dispatch(getPosts(posts))
    });
};

export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS';
const fetchCategoryPosts = (category) => (dispatch) => {
  api(`/${category}/posts`, 'GET')
    .then((categoryPosts) => {
      dispatch(getPosts(categoryPosts));
      dispatch(setSelectedCategory(category));
    });
};

export const FETCH_POST = 'FETCH_POST';
const fetchPost = (postId) => (dispatch) => {
  api(`/posts/${postId}`, 'GET')
    .then((post) => {
      if (!_.get(post, 'deleted')) {
        api(`/posts/${postId}/comments`, 'GET')
          .then((comments) => {
            const activePost = _.clone(post);

            activePost.comments = comments.filter(comment => comment.deleted === false);

            dispatch(getPost(activePost));
          });
      }
    });
}

export const GET_POST = 'GET_POST';
const getPost = (post) => {
  return {
    type: GET_POST,
    post
  };
};

export { fetchPosts, fetchCategoryPosts, fetchPost };
