
import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostPage extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        <h2>PostPage: {this.props.postId}</h2>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...state,
    postId: ownProps.match.params.id
  }
}

export default connect(mapStateToProps)(PostPage);
