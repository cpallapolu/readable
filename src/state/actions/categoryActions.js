
import api from '../api';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
const fetchCategories = () => (dispatch) => {
  api('/categories', 'GET')
    .then((response) => {
      dispatch(getCategories(response.categories))
    });
};

export const GET_CATEGORIES = 'GET_CATEGORIES';
const getCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    categories
  };
};

export { fetchCategories }
