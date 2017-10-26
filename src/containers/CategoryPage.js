
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostsGrid from '../components/PostsGrid';
import CategoryGrid from '../components/CategoryGrid';

import { CATEGORY_PAGE } from '../state/actions';
import { fetchPosts, setPage, setCategory } from '../state/actions';

class CategoryPage extends Component {
  static propTypes = {

  }

  componentWillMount() {
    this.props.setPage(CATEGORY_PAGE);
    this.props.setCategory(this.props.name);
    this.props.fetchPosts(this.props.name);
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
    categories: state.categories,
    posts: state.posts,
    name: ownProps.name
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: (category) => dispatch(fetchPosts(category)),
    setPage: (page) => dispatch(setPage(page)),
    setCategory: (category) => dispatch(setCategory(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
