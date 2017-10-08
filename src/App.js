
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './styles/App.css';

import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import PostPage from './components/PostPage';
import EditPage from './components/EditPage';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <HomePage />
        )} />

        <Route path='/category' render={() => (
          <CategoryPage />
        )} />

        <Route path='/post' render={() => (
          <PostPage />
        )} />

        <Route path='/edit' render={() => (
          <EditPage />
        )} />
      </div>
    );
  }
}

export default connect()(App);
