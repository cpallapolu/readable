
import _ from 'lodash';

const BACKEND_URL = 'http://localhost:3001';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);

    error.response = response;

    throw error;
  }
};

const callApi = (path, options = {}) => {
  const completeUrl = `${BACKEND_URL}${path}`;

  const completeOptions ={
    method: _.toUpper(options.method),
    headers: options.headers
  };

  if (_.get(options, 'body')) {
    completeOptions.body = JSON.stringify(_.get(options, 'body', {}));
  }

  return fetch(completeUrl, completeOptions)
    .then(checkStatus)
    .then(response => response.json())
    .catch(err => err);
};

export default callApi;
