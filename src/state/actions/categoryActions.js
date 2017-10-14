
import api from '../api';

export const FETCH_ALL_CATEGORIES = 'FETCH_ALL_CATEGORIES';
const fetchCategories = () => (dispatch) => {
  api('/categories', 'GET')
    .then((response) => {
      dispatch(getCategories(response.categories))
    });
};

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
const getCategories = (categories) => {
  return {
    type: GET_ALL_CATEGORIES,
    categories
  };
};

export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
const setSelectedCategory = (name) => {
  return {
    type: SET_SELECTED_CATEGORY,
    name
  }
}

export { fetchCategories, setSelectedCategory }
