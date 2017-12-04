
import _ from 'lodash';
import uuid from 'uuid/v4';

import api from '../api';

import { POST_PAGE, HOME_PAGE,CATEGORY_PAGE } from './';
import { setPost, setCommentId, setCurrentEditingPostId, setRedirect } from './';

const dispatchBasedOnPage = (args, dispatch) => {
  const { page } = args;

  if (page === POST_PAGE) {
    dispatch(fetchPost(args.postId));
  }

  if (page === HOME_PAGE) {
    dispatch(fetchPosts());
  }

  if (page === CATEGORY_PAGE) {
    dispatch(fetchPosts(args.category));
  }
};

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
      if (_.isEmpty(post)) {
        dispatch(setRedirect(true));
        dispatch(setPost(post));
      }

      if (!_.isEmpty(post) && !_.get(post, 'deleted')) {
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
    timestamp: new Date().getTime()
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

  api(`/posts/${postId}`, 'POST', body)
    .then(() => {
      const { current } = getState();

      const args = {
        page: current.page,
        category: current.category,
        postId: postId
      };

      dispatchBasedOnPage(args, dispatch);
    });
};

export const UPDATE_POST = 'UPDATE_POST';
const updatePost = (postObj) => (dispatch, getState) => {
  const body = {
    title: postObj.title,
    body: postObj.body
  };

  const { current } = getState();

  api(`/posts/${postObj.id}`, 'PUT', body)
    .then(() => {
      dispatch(setCurrentEditingPostId(false));

      const args = {
        page: current.page,
        category: current.category,
        postId: postObj.id
      };

      dispatchBasedOnPage(args, dispatch);
    });
}

export const DELETE_POST = 'DELETE_POST';
const deletePost = (postId) => (dispatch, getState) => {
  const { current } = getState();

  const currPostId = _.get(current, 'post.id', postId);

  api(`/posts/${currPostId}`, 'DELETE')
    .then(() => {
      console.log('current: ', current.page);
      const args = {
        page: current.page === POST_PAGE ? CATEGORY_PAGE : current.page,
        category: current.category
      };

      dispatchBasedOnPage(args, dispatch);
    });
};

export const SORT_POSTS = 'SORT_POSTS';
const sortPosts = (type, order) => (dispatch, getState) => {
  const { posts } = getState();

  const sortedPosts = _.orderBy(posts, [type], [order]);

  dispatch(getPosts(sortedPosts));
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

export const ADD_COMMENT = 'ADD_COMMENT';
const addComment = (body) => (dispatch, getState) => {
  const { current } = getState();
  const postId = current.post.id;

  const commentObj = {
    id: uuid(),
    timestamp: new Date().getTime(),
    body,
    author: current.author || 'Test User',
    parentId: postId
  };

  api('/comments/', 'POST', commentObj)
    .then(() => dispatch(fetchPost(postId)));
}

export const UPDATE_COMMENT = 'UPDATE_COMMENT';
const updateComment = (commentObj) => (dispatch, getState) => {
  const body = {
    timestamp: new Date().getTime(),
    body: commentObj.body
  };

  const { current } = getState();

  api(`/comments/${commentObj.id}`, 'PUT', body)
    .then(() => {
      dispatch(fetchPost(current.post.id));
      dispatch(setCommentId(''));
    });
};

export const DELETE_COMMENT = 'DELETE_COMMENT';
const deleteComment = (commentId) => (dispatch, getState) => {
  api(`/comments/${commentId}`, 'DELETE')
    .then(() => {
      const { current } = getState();

      dispatch(fetchPost(current.post.id));
    });
}


export {
  fetchPosts,
  fetchPost,
  addPost,
  votePost,
  updatePost,
  deletePost,
  sortPosts,
  getComments,
  voteComment,
  addComment,
  updateComment,
  deleteComment
};
