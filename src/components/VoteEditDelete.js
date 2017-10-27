
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CardActions } from 'material-ui/Card';
import { IconButton, Badge } from 'material-ui';
import { ThumbUp, ThumbDown } from 'material-ui-icons';
import { red, teal } from 'material-ui/colors';

import { UP, DOWN } from '../state/actions';

import EditDelete from './EditDelete';

const styles = theme => ({
  voteScoreBadge: { margin: `0 ${theme.spacing.unit - 1}px` },
  thumbDown: { color: red[400] },
  thumbUp: { color: teal[400] },
  moveRight: { flex: '1 1 auto' }
});

class VoteEditDelete extends Component {
  static defaultProps = {

  };

  static PropTypes = {
    id: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    editMode: PropTypes.bool.isRequired,
    voteUpOrDown: PropTypes.func.isRequired
  };

  render() {
    const { classes } = this.props;
    const { id, voteScore, editMode } = this.props;
    const { voteUpOrDown } = this.props;

    return (
      <CardActions>
        <IconButton aria-label="Thumbs up" disabled={editMode}>
          <ThumbUp className={classes.thumbUp} onClick={() => voteUpOrDown(id, UP)} />
        </IconButton>
        <Badge className={classes.voteScoreBadge} badgeContent={voteScore} color="primary" children="" style={{}} />
        <IconButton aria-label="Thumbs Down" disabled={editMode}>
          <ThumbDown className={classes.thumbDown} onClick={() => voteUpOrDown(id, DOWN)} />
        </IconButton>

        <div className={classes.moveRight} />

        <EditDelete postId={id} editMode={editMode} />
      </CardActions>
    )
  };
}

export default (withStyles(styles)(VoteEditDelete));
