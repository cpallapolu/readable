
import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';

import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle, withMobileDialog } from 'material-ui/Dialog';
import { Button } from 'material-ui';

class CustomDialog extends Component {
  static defaultProps = {

  };

  static PropTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    contentText: PropTypes.string.isRequired
  };

  state = {
    fireRedirect: false
  };

  handleClickButton(toPath) {
    this.setState({ toPath });
    this.setState({ fireRedirect: true });
  };

  render() {
    const { open, contentText, title } = this.props;
    const { fireRedirect,toPath } = this.state;

    return (
      <div>
        { fireRedirect && <Redirect to={toPath}/> }

        <Dialog
          open={open} >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {contentText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClickButton('/')} color="primary" autoFocus>
              Home Page
            </Button>
            <Button onClick={() => this.handleClickButton('/create')} color="primary" autoFocus>
              Create Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withMobileDialog()(CustomDialog);
