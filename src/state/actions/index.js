
import * as categoryActions from './categoryActions';
import * as postsActions from './postsActions';

export const { GET_ALL_CATEGORIES, FETCH_ALL_CATEGORIES, SET_SELECTED_CATEGORY } = categoryActions;
export const { fetchCategories, setSelectedCategory } = categoryActions;

export const { GET_ALL_POSTS, FETCH_ALL_POSTS, FETCH_CATEGORY_POSTS, FETCH_POST, GET_POST, UP, DOWN } = postsActions;
export const { fetchPosts, fetchCategoryPosts, fetchPost, addPost, votePost } = postsActions;
