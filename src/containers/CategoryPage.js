
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostsGrid from '../components/PostsGrid';
import CategoryGrid from '../components/CategoryGrid';

import { fetchCategoryPosts } from '../state/actions';

class CategoryPage extends Component {
  static propTypes = {

  }

  componentWillMount() {
    this.props.fetchCategoryPosts(this.props.name);
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
    posts: state.posts.allPosts,
    name: ownProps.match.params.name
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategoryPosts: (data) => dispatch(fetchCategoryPosts(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
