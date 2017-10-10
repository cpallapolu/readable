
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/App.css';

import Header from '../components/Header';
import HomePage from './HomePage';
import CategoryPage from './CategoryPage';
import PostPage from './PostPage';
import EditPage from './EditPage';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />

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
