
import React, { Component } from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { CardContent } from 'material-ui/Card';
import { Avatar, Typography, Divider } from 'material-ui';
import { grey } from 'material-ui/colors';

import EditForm from './EditForm';
import VoteEditDelete from './VoteEditDelete';

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
    const { author, timestamp, editMode, body, id } = this.props;
    const { voteScore } = this.props;
    const { updateComment, voteComment } = this.props;

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
              editMode ?
                <EditForm id={id} body={body} updatePost={updateComment}/> :
                <Typography paragraph type="body2"> {body}<br/> </Typography>
            }
          </div>
        </CardContent>

        <VoteEditDelete id={id} voteScore={voteScore} editMode={editMode} voteUpOrDown={voteComment} />

        <Divider className={classes.firstDividerColor} />
      </CardContent>
    )
  };
}

export default (withStyles(styles)(CommentCard));
