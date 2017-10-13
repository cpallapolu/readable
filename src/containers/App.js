
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/App.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
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

        <Route path='/category/:name' render={(props) => (
          <CategoryPage {...props} />
        )} />

        <Route path='/post/:id' render={(props) => (
          <PostPage {...props}/>
        )} />

        <Route path='/edit' render={() => (
          <EditPage />
        )} />

        <Route path='/info' render={() => (
          <EditPage />
        )} />

        <Footer />

      </div>
    );
  }
}

export default withRouter(connect()(App));
