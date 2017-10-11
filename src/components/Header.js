
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { grey } from 'material-ui/colors';

import { withStyles } from 'material-ui/styles';

import { AppBar, Toolbar, Typography, IconButton, Button } from 'material-ui';

import { Info } from 'material-ui-icons';

const styles = theme => ({
  root: { marginTop: theme.spacing.unit * 3, width: '100%' },
  flex: { flex: 1 },
  link: { 'text-decoration': 'none' },
  button: { color: grey[50], 'text-transform': 'none', 'font-size': 'larger' },
  menuButton: { marginLeft: -12, marginRight: 20 },
  info: { color: grey[50], width: '25px', height: '25px' }
});

class Header extends Component {
  static propTypes = {

  }

  handleTouchTap() {
    alert('onClick triggered on the title component');
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography type="title" className={classes.flex}>
              <Link to="/" className={classes.link}>
                <Button className={classes.button}> Readable </Button>
              </Link>
            </Typography>

            <IconButton color="contrast" aria-label="Info">
              <Link to="/info" >
                <Info className={classes.info} />
              </Link>
            </IconButton>
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

export default connect(mapStateToProps)(withStyles(styles)(Header));
