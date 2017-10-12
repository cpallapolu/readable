
import { GET_CATEGORIES } from './';

const getCategories = () => {
  return {
    type: GET_CATEGORIES,
    meta: {
      key: 'categories',
      method: 'GET',
      path: '/categories',
      remote: true
    }
  }
};

export { getCategories }
