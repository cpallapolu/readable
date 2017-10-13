
import React, { Component } from 'react';
import { connect } from 'react-redux';

class CategoryPage extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        <h2>CategoryPage: {this.props.categoryName}</h2>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...state,
    categoryName: ownProps.match.params.name
  }
}

export default connect(mapStateToProps)(CategoryPage);
