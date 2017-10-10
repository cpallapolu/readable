
// import io from 'socket.io-client';
import { createStore } from 'redux';

// import apiMiddleWare from './apiMiddleWare';
// import reducers from './reducers';

const store = createStore(
  () => {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// const { protocol, hostname } = window.location;

// const socket = io(`${protocol}//${hostname}:5000`);

// const storeWithMiddleWare = applyMiddleware(apiMiddleWare(socket))(createStore);

// const store = storeWithMiddleWare(reducers);

// socket.on('connectedToServer', state => store.dispatch(setState(state)));

// store.dispatch(setClientId());
// store.dispatch(getExperience());

export { store };
