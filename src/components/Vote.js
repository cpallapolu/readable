
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { IconButton, Avatar } from 'material-ui';
import { ThumbUp, ThumbDown } from 'material-ui-icons';
import { red, teal } from 'material-ui/colors';

import { UP, DOWN } from '../state/actions';

const styles = theme => ({
  voteScoreBadge: { width: '24px', height: '24px', fontSize: '0.75rem', marginTop: '12px', backgroundColor: '#2196f3', color: 'rgba(255, 255, 255, 1)' },
  thumbDown: { color: red[400] },
  thumbUp: { color: teal[400] },
  row: { display: 'flex', justifyContent: 'center' }
});

class Vote extends Component {
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
      <div className={classes.row}>
        <IconButton aria-label="Thumbs up" disabled={editMode}>
          <ThumbUp className={classes.thumbUp} onClick={() => voteUpOrDown(id, UP)} />
        </IconButton>
        <Avatar className={classes.voteScoreBadge} color="primary">{voteScore}</Avatar>
        <IconButton aria-label="Thumbs Down" disabled={editMode}>
          <ThumbDown className={classes.thumbDown} onClick={() => voteUpOrDown(id, DOWN)} />
        </IconButton>
      </div>
    )
  };
}

export default withStyles(styles)(Vote);
