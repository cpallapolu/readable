

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue, red, green } from 'material-ui/colors';

import { store } from './state/store';
import App from './containers/App';

import './styles/index.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
    secondary: {
      ...green,
      A400: '#00e677',
    },
    error: red,
  },
});

const Root = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};


render(<Root />, document.getElementById('root'));
