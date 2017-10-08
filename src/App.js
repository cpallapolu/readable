
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => ('Hello World HomePage')} />
        <Route path='/category' render={() => ('Category Page')} />
        <Route path='/post' render={() => ('Post Page')} />
        <Route path='/edit' render={() => ('Edit Page')} />
      </div>
    );
  }
}

export default App;
