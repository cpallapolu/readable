
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PostsGrid from '../components/PostsGrid';
import CategoryGrid from '../components/CategoryGrid';

import { HOME_PAGE } from '../state/actions';
import { fetchPosts, setPage, setCategory, setCurrentEditingPostId } from '../state/actions';

class HomePage extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
    setPage: PropTypes.func.isRequired,
    setCategory: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.setPage(HOME_PAGE);
    this.props.setCategory();
    this.props.fetchPosts();
    this.props.setCurrentEditingPostId(false);
  }

  render() {
    const { categories, posts } = this.props;

    return (
      <div>
        {
          !posts.length ? <h2>Loading...</h2> :
            <div>
              <CategoryGrid categories={categories} />

              <PostsGrid posts={posts} />
            </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories,
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    setPage: (page) => dispatch(setPage(page)),
    setCategory: () => dispatch(setCategory()),
    setCurrentEditingPostId: () => dispatch(setCurrentEditingPostId())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
