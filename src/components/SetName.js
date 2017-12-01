
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import { TextField, Button } from 'material-ui';


import PropTypes from 'prop-types';

import { setName } from '../state/actions';

const styles = theme => ({
  bodyField: { marginLeft: theme.spacing.unit, marginRight: theme.spacing.unit, width: 700 }
});

class SetName extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired
  };

  state = {
    name: 'Chan User'
  }

  handleChange(name) {
    this.setState({ name });
  }

  handleSubmit() {
    this.props.setName(_.get(this.state, 'name', 'Chan User'))
  }

  render() {
    const { classes } = this.props;
    const { open } = this.props;

    return (
      <Dialog
        open={open} >
        <DialogTitle>{'Please set your display name'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              className={classes.bodyField}
              label="Name"
              placeholder="Chan User"
              rowsMax="1"
              fullWidth
              onChange={(e) => this.handleChange(e.target.value) }
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleSubmit()} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setName: (name) => dispatch(setName(name))
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(SetName));
