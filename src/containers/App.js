
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SetName from '../components/SetName';
import Header from '../components/Header';
import HomePage from './HomePage';
import CategoryPage from './CategoryPage';
import PostPage from './PostPage';
import NewPostPage from './NewPostPage';

import { fetchCategories } from '../state/actions';

class App extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  render() {
    const { currentEditingPostId } = this.props;

    return (
      <div className="app">
        <SetName open={!this.props.name.length} />

        <Header />

        <Route exact path='/' render={() => (
          <HomePage />
        )} />

        <Route exact path='/category/:name' render={(props) => (
          <CategoryPage name={props.match.params.name} />
        )} />

        <Route exact path='/post/:id' render={(props) => (
          <PostPage id={props.match.params.id} editMode={currentEditingPostId} />
        )} />

        <Route exact path='/create' render={() => (
          <NewPostPage />
        )} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.current.name,
    iEditingPost: state.current.currentEditingPostId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
