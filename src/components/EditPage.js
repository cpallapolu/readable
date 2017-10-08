
import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditPage extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        <h2>EditPage</h2>
      </div>
    )
  }
}


export default connect()(EditPage);
