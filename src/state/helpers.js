
const initialState = {
  categories: [],
  posts: [],
  comments: []
};

const AUTH_KEY = 'whatever-you-want';

const BASE_URL = 'http://localhost:3001';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);

    error.response = response;

    throw error;
  }
};

export { AUTH_KEY, BASE_URL, initialState, checkStatus };
