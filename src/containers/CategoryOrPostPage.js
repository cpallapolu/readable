
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import _ from 'lodash';

import CategoryPage from '../components/CategoryPage';
import PostPage from '../components/PostPage';

class CategoryOrPostPage extends Component {
  static defaultProps = {

  };

  static PropTypes = {
    name: PropTypes.string.isRequired,
    editMode: PropTypes.string.isRequired
  };

  render() {
    const { name, categories, currentEditingPostId } = this.props;

    const isCategory = _.findIndex(categories, { name }) !== -1;

    return (
      <div>
        {
          isCategory ?
            <CategoryPage name={name} /> :
            <PostPage id={name} editMode={currentEditingPostId} />
        }
      </div>
    )
  };
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories,
    ...ownProps
  }
}

export default connect(mapStateToProps)(CategoryOrPostPage);
