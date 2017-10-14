
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostsGrid from '../components/PostsGrid';
import CategoryGrid from '../components/CategoryGrid';

import { fetchPosts } from '../state/actions';

class HomePage extends Component {
  static propTypes = {

  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    const { categories, posts } = this.props;

    return (
      <div>
        <CategoryGrid categories={categories} />

        <PostsGrid posts={posts} />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories.allCategories,
    posts: state.posts.allPosts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
