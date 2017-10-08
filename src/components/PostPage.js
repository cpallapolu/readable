
import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostPage extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        <h2>PostPage</h2>
      </div>
    )
  }
}


export default connect()(PostPage);
