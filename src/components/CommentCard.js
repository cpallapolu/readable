
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedDate, FormattedTime } from 'react-intl';
import PropTypes from 'prop-types';

import _ from 'lodash';

import { withStyles } from 'material-ui/styles';
import { CardContent, CardActions } from 'material-ui/Card';
import { Avatar, Typography, Divider } from 'material-ui';

import { grey } from 'material-ui/colors';

import EditForm from './EditForm';
import EditDeleteComment from './EditDeleteComment';
import Vote from './Vote';

import { voteComment, updateComment, setCommentId } from '../state/actions';

const styles = theme => ({
  moveRight: { flex: '1 1 auto' },
  firstDividerColor: { 'background-color': grey[700] }
});

class CommentCard extends Component {
  static defaultProps = {

  };

  static PropTypes = {
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    editMode: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    voteComment: PropTypes.func.isRequired,
    updateComment: PropTypes.func.isRequired
  };

  render() {
    const { classes } = this.props;
    const { author, timestamp, editMode, body, id, postId } = this.props;
    const { voteScore } = this.props;
    const { updateComment, voteComment } = this.props;
    const { commentId } = this.props

    return (
      <CardContent>
        <CardContent>
          <div style={{width:'60px', float:'left'}}>
            <Avatar className={classes.avatar}>{author.match(/\b(\w)/g).slice(0, 2).join('').toUpperCase()}</Avatar>
          </div>
          <div>
            <Typography paragraph type="body2">
              {author}<br/>
              <FormattedDate value={timestamp} day="numeric" month="long" year="numeric" />{ ' at ' }
              <FormattedTime value={timestamp} hour="numeric" minute="numeric" />
            </Typography>
          </div>
          <div>
            {
              commentId === id ?
                <EditForm id={id} body={body} update={updateComment}/> :
                <Typography paragraph type="body2"> {body}<br/> </Typography>
            }
          </div>
        </CardContent>

        <CardActions>
          <Vote id={id} voteScore={voteScore} editMode={id === commentId} voteUpOrDown={_.partialRight(voteComment, postId)} />

          <div className={classes.moveRight} />

          <EditDeleteComment id={id} isEditingComment={id === commentId} />
        </CardActions>

        <Divider className={classes.firstDividerColor} />
      </CardContent>
    )
  };
}

function mapStateToProps(state, ownProps) {
  return {
    commentId: state.current.commentId,
    ...ownProps
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCommentId: (commentId) => dispatch(setCommentId(commentId)),
    voteComment: (commentId, upOrDown, postId) => dispatch(voteComment(commentId, upOrDown, postId)),
    updateComment: (commentObj) => dispatch(updateComment(commentObj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CommentCard));
