
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { grey, red } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';
import { AppBar, Toolbar, Typography, Tooltip, Button } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';


const styles = theme => ({
  root: { marginBottom: theme.spacing.unit * 3, width: '100%' },
  flex: { flex: 1 },
  link: { 'text-decoration': 'none' },
  infoButton: { color: grey[50], width: '36px', height: '36px' },
  createButton: { color: red[500], width: '36px', height: '36px', marginRight: '6px'  },
  menuButton: { marginLeft: -12, marginRight: 20 },
  info: { color: grey[50], width: '25px', height: '25px', justifyContent: 'center' }
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
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography type="title" className={classes.flex}>
              <Link to="/" className={classes.link}>
                <Button className={classes.button}> Readable </Button>
              </Link>
            </Typography>
            <Tooltip id="tooltip-fab" title="Create New Post" placement="bottom">
              <Button fab color="accent" aria-label="add" className={classes.createButton}>
                <Link to="/create" >
                  <AddIcon className={classes.info} />
                </Link>
              </Button>
            </Tooltip>
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
