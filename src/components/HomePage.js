
import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomePage extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        <h2>Homepage</h2>
      </div>
    )
  }
}


export default connect()(HomePage);
