
import _ from 'lodash';

import callApi from './callApi';

const middleware = store => next => action => {
  const meta = _.get(action, 'meta', {});

  if (meta.remote) {
    const { path, method } = meta;

    const options = {
      method,
      headers: {
        Authorization: 'whatever-you-want'
      }
    };

    if (_.get(meta, 'body')) {
      options.body = _.get(meta, 'body', {})
    }

    return callApi(path, options)
      .then(resp => next(_.assign({}, action, { [meta.key]: resp })));
  }

  return next(action);
};

export default middleware;
