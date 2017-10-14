
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPost } from '../state/actions';

class PostPage extends Component {
  static propTypes = {

  }

  componentWillMount() {
    this.props.fetchPost(this.props.postId);
  }

  render() {
    return (
      <div>
        <h2>PostPage: {this.props.postId}</h2>

        {this.props.post.title}
        {this.props.post.body}
        {this.props.post.author}
        {this.props.post.category}
        {this.props.post.timestamp}
        {this.props.post.voteScore}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts.selectedPost,
    postId: ownProps.match.params.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (data) => dispatch(fetchPost(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
