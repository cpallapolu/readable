
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

import { fetchCategories } from '../state/actions';

class App extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div className="app">
        <Header />

        <Route exact path='/' render={() => (
          <HomePage />
        )} />

        <Route exact path='/category/:name' render={(props) => (
          <CategoryPage name={props.match.params.name} />
        )} />

        <Route exact path='/post/:id' render={(props) => (
          <PostPage id={props.match.params.id} editMode={false} />
        )} />
        <Route exact path='/post/edit/:id' render={(props) => (
          <PostPage id={props.match.params.id} editMode={true} />
        )} />

        <Route exact path='/edit' render={() => (
          <EditPage />
        )} />

        <Route exact path='/info' render={() => (
          <EditPage />
        )} />

        <Footer />

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
