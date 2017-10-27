
import _ from 'lodash';
import uuid from 'uuid/v4';

import api from '../api';

import { POST_PAGE } from './';
import { setPost } from './';

export const GET_POSTS = 'GET_POSTS';
const getPosts = (posts) => {
  return {
    type: GET_POSTS,
    posts
  };
};

export const GET_POST = 'GET_POST';
const getPost = (post) => {
  return {
    type: GET_POST,
    post
  };
};

export const FETCH_POSTS = 'FETCH_POSTS';
const fetchPosts = (category = '') => (dispatch) => {
  let activePosts = [];

  const url = category.length ? `/${category}/posts` : '/posts'

  api(url, 'GET')
    .then(posts => {
      activePosts = posts.filter(post => !post.deleted);

      return activePosts;
    })
    .then(activePosts => activePosts.map(activePost => api(`/posts/${activePost.id}/comments`, 'GET')))
    .then((commentsPromise) => Promise.all(commentsPromise))
    .then((comments) => {
      const flattenComments = _.flatten(comments);

      const activePostsWithComments = activePosts.map((activePost) => {
        activePost.comments = flattenComments.filter(comment => comment.parentId === activePost.id && !comment.deleted);

        return activePost;
      });

      dispatch(getPosts(activePostsWithComments));
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

            dispatch(setPost(activePost));
          });
      }
    });
}

export const ADD_POST = 'ADD_POST';
const addPost = (postObj) => (dispatch) => {
  const additionalPostObj = {
    id: uuid(),
    timestamp: new Date()
  };

  const completePostObj = _.assign(additionalPostObj, postObj);

  api('/posts', 'POST', completePostObj)
    .then(() => fetchPosts(postObj.category));
};

export const VOTE_POST = 'VOTE_POST';
export const UP = 'UP';
export const DOWN = 'DOWN';
const votePost = (postId, upOrDown) => (dispatch, getState) => {
  const body = {
    option: (upOrDown === UP) ? 'upVote' : 'downVote'
  };

  const { current } = getState();

  api(`/posts/${postId}`, 'POST', body)
    .then(() => {
      if (current.page === POST_PAGE) {
        dispatch(fetchPost(postId));
      } else {
        dispatch(fetchPosts(current.category));
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
      dispatch(fetchPost(postObj.id));
    });
}

export const DELETE_POST = 'DELETE_POST';
const deletePost = (postId) => (dispatch) => {
  api(`/posts/${postId}`, 'DELETE')
    .then(() => {
      dispatch(fetchPosts());
    });
};

export const GET_COMMENTS = 'GET_COMMENTS';
const getComments = (post) => (dispatch) => {
  api(`/posts/${post.id}/comments`, 'GET')
    .then((comments) => {
      const activePost = _.clone(post);

      activePost.comments = comments.filter(comment => comment.deleted === false);

      dispatch(getPost(activePost));
    });
};

export const VOTE_COMMENT = 'VOTE_COMMENT';
const voteComment = (commentId, upOrDown, postId) => (dispatch) => {
  const body = {
    option: (upOrDown === UP) ? 'upVote' : 'downVote'
  };

  api(`/comments/${commentId}`, 'POST', body)
    .then(() => dispatch(fetchPost(postId)));
}

export const UPDATE_COMMENT = 'UPDATE_COMMENT';
const updateComment = (commentObj) => (dispatch) => {
  const body = {
    timestamp: new Date(),
    body: commentObj.body
  };

  api(`/comments/${commentObj.id}`, 'PUT', body)
    .then(() => dispatch(fetchPost(commentObj.parentId)));
};

export const DELETE_COMMENT = 'DELETE_COMMENT';
const deleteComment = (commentId, postId) => (dispatch) => {
  api(`/comments/${commentId}`, 'DELETE')
    .then(() => dispatch(fetchPost(postId)));
}


export {
  fetchPosts,
  fetchPost,
  addPost,
  votePost,
  updatePost,
  deletePost,
  getComments,
  voteComment,
  updateComment,
  deleteComment
};
