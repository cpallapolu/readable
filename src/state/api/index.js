
import _ from 'lodash';

import { AUTH_KEY, BASE_URL } from '../helpers';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);

    error.response = response;

    throw error;
  }
};

const callApi = (path, method, body = {}) => {
  const completeUrl = `${BASE_URL}${path}`;

  const completeOptions ={
    method: _.toUpper(method),
    headers: { Authorization: AUTH_KEY }
  };

  if (!_.isEmpty(body)) {
    completeOptions.body = JSON.stringify(body);
  }

  return fetch(completeUrl, completeOptions)
    .then(checkStatus)
    .then(response => response.json())
    .catch(err => err);
};

export default callApi;
