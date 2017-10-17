
import _ from 'lodash';
import uuid from 'uuid/v4';

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
      dispatch(getPosts(posts));
      dispatch(setSelectedCategory(''));
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

export const ADD_POST = 'ADD_POST';
const addPost = (postObj) => (dispatch) => {
  const additionalPostObj = {
    id: uuid(),
    timestamp: new Date()
  };

  const completePostObj = _.assign(additionalPostObj, postObj);

  api('/posts', 'POST', completePostObj)
    .then(() => fetchCategoryPosts(postObj.category));
};

export const VOTE_POST = 'VOTE_POST';
export const UP = 'UP';
export const DOWN = 'DOWN';
const votePost = (postId, upOrDown, category = '') => (dispatch) => {
  const body = {
    option: (upOrDown === UP) ? 'upVote' : 'downVote'
  };

  api(`/posts/${postId}`, 'POST', body)
    .then(() => {
      if (category.length) {
        dispatch(fetchCategoryPosts(category))
      } else {
        dispatch(fetchPosts());
      }
    });
};

export const UPDATE_POST = 'UPDATE_POST';
const updatePost = (postObj, category = '') => (dispatch) => {
  const body = {
    title: postObj.title,
    body: postObj.body
  };

  api(`/posts/${postObj.id}`, 'PUT', body)
    .then(() => {
      if (category.length) {
        dispatch(fetchCategoryPosts(category))
      } else {
        dispatch(fetchPosts());
      }
    });
}

export { fetchPosts, fetchCategoryPosts, fetchPost, addPost, votePost, updatePost };
