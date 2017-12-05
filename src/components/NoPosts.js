
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';


import Card, { CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';


import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  card: { minWidth: 900 },
  root: { width: '80%', margin: '0 auto' },
  cardContent: { padding: '5px 16px'},
  moveRight: { flex: '1 1 auto' },
  link: { 'text-decoration': 'none' },

});

class NoPosts extends Component {
  static defaultProps = {
  };

  static PropTypes = {
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} >
        <Card className={classes.card} raised>
          <CardActions>
            <Typography type="headline" component="h3">
              Be the first one to create a post
            </Typography>
            <div className={classes.moveRight} />
            <Typography type="title" className={classes.flex}>
              <Link to="/create" className={classes.link}>
                <Button > Create New Post </Button>
              </Link>
            </Typography>
          </CardActions>

        </Card>
      </div>
    );
  }
};

export default connect(null, null)(withStyles(styles)(NoPosts));
