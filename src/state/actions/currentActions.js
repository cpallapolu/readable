
export const SET_PAGE = 'SET_PAGE';
const setPage = (page) => {
  return {
    type: SET_PAGE,
    page
  }
};

export const SET_CATEGORY = 'SET_CATEGORY';
const setCategory = (category = '') => {
  return {
    type: SET_CATEGORY,
    category
  }
};

export { setPage, setCategory };
