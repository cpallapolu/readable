
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { IconButton, Badge } from 'material-ui';
import { CardActions } from 'material-ui/Card';

import { ModeComment } from 'material-ui-icons';

import { grey } from 'material-ui/colors';

import CategoryChip from './CategoryChip';

const styles = theme => ({
  moveRight: { flex: '1 1 auto' },
  modeComment: { color: '#ffffff' },
  // categoryChip: { color: grey[500] }
});

class CommentCategory extends Component {
  static PropTypes = {
    commentsNum: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired
  };

  render() {
    const { classes } = this.props;
    const { commentsNum, category } = this.props;

    return (
      <CardActions>
        <IconButton aria-label="Click Me" disabled={true}>
          <Badge badgeContent={commentsNum} color="accent" >
            <ModeComment style={{color: '#ffffff'}}/>
          </Badge>
        </IconButton>
        <div className={classes.moveRight} />
        <CategoryChip style={{color: grey[500]}} className={classes.categoryChip} name={category} path={category} />
      </CardActions>
    )
  };
}

export default (withStyles(styles)(CommentCategory));
