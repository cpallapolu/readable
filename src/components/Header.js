
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AppBar, FlatButton } from 'material-ui';

class Header extends Component {
  static propTypes = {

  }

  handleTouchTap() {
    alert('onClick triggered on the title component');
  }

  render() {
    return (
      <div>
        <AppBar
          title={<span style={{cursor: 'pointer'}}>Readable</span>}
          onTitleTouchTap={this.handleTouchTap}
          showMenuIconButton={false}
          iconElementRight={<FlatButton label="Info" />}
        />
      </div>
    )
  }
}


export default connect()(Header);
