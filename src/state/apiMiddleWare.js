
import _ from 'lodash';

export default socket => store => next => action => {
	if (action.meta && action.meta.remote) {
		const clientId = store.getState().getIn(['clientId']);

		socket.emit('action', _.assign({}, action, {clientId}));
	}

	return next(action);
};
