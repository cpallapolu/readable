
import * as categoryActions from './categoryActions';
import * as postsActions from './postsActions';
import * as currentActions from './currentActions';

export const HOME_PAGE = 'HOME_PAGE';
export const CATEGORY_PAGE = 'CATEGORY_PAGE';
export const POST_PAGE = 'POST_PAGE';
export const EDIT_PAGE = 'EDIT_PAGE';
export const CREATE_PAGE = 'CREATE_PAGE';

export const { SET_PAGE, SET_CATEGORY, SET_POST } = currentActions;
export const { setPage, setCategory, setPost } = currentActions;

export const { GET_ALL_CATEGORIES, FETCH_ALL_CATEGORIES } = categoryActions;
export const { fetchCategories } = categoryActions;

export const { GET_POSTS, FETCH_POSTS, FETCH_POST, GET_POST, UP, DOWN } = postsActions;
export const { fetchPosts, fetchPost, addPost, votePost, updatePost, deletePost } = postsActions;

export const { GET_COMMENTS, VOTE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } = postsActions;
export const { getComments, voteComment, updateComment, deleteComment } = postsActions;
