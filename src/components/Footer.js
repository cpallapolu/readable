
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

import { AppBar, Toolbar, Typography } from 'material-ui';

import { Copyright } from 'material-ui-icons';

const styles = theme => ({
  root: { marginTop: theme.spacing.unit * 3, width: '100%', position: 'absolute' },
  flex: { flex: 1, justify: 'center', 'text-align': 'center' },
  copyright: { width: 18, height: 18 }
});

class Footer extends Component {
  static propTypes = {

  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography type="body1" className={classes.flex}>
              Developed By Chanakya Pallapolu, 2017 <Copyright className={classes.copyright}/>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...state,
    classes: ownProps.classes
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Footer));
