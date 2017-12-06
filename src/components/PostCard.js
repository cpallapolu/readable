
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedDate, FormattedTime } from 'react-intl';
import { withStyles } from 'material-ui/styles';
import { grey, red, teal, cyan } from 'material-ui/colors';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import { Avatar, IconButton, Divider } from 'material-ui';
import { Reply } from 'material-ui-icons';

import TitleBody from '../components/TitleBody';
import CommentCategory from '../components/CommentCategory';
import Vote from '../components/Vote';
import EditDeletePost from '../components/EditDeletePost';

import { votePost, updatePost } from '../state/actions';

const styles = theme => ({
  card: { minWidth: 900 },
  cardHeader: { padding: '5px 16px'},
  cardContent: { padding: '5px 16px'},
  cardActions: { padding: '0px 4px'},
  title: { marginBottom: 16, color: theme.palette.text.primary },
  body: { marginBottom: 16, color: theme.palette.text.secondary },
  avatar: { color: cyan['A400'] },
  firstDividerColor: { 'background-color': grey[700] },
  secondDividerColor: { 'background-color': grey[700] },
  moveRight: { flex: '1 1 auto' },
  categoryChip: { margin: `0 ${theme.spacing.unit}px` },
  voteScoreBadge: { margin: `0 ${theme.spacing.unit - 1}px` },
  openPost: { marginLeft: `${theme.spacing.unit - 28}px` },
  thumbDown: { color: red[400] },
  thumbUp: { color: teal[400] },
  editPost: { color: teal[400] },
  reply: { transform: 'scaleX(-1)', color: grey[50] }
});

class PostCard extends Component {
  static defaultProps = {
    category: ''
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    category: PropTypes.string,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    voteScore: PropTypes.number.isRequired,
    commentsNum: PropTypes.number.isRequired
  }

  render() {
    const { classes } = this.props;
    const { id, title, body, author, timestamp, voteScore, category, commentsNum } = this.props;
    const { votePost } = this.props;
    const { currentEditingPostId } = this.props;

    return (
      <Card className={classes.card} raised>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar aria-label="Author Titles" className={classes.avatar}>{author.match(/\b(\w)/g).join('').toUpperCase()}</Avatar>
          }
          title={author}
          subheader={
            <div>
              <FormattedDate value={timestamp} day="numeric" month="long" year="numeric" />{ ' at ' }
              <FormattedTime value={timestamp} hour="numeric" minute="numeric" />
            </div>
          }
        />

        <Divider className={classes.firstDividerColor} />

        <CardContent className={classes.cardContent}>
          <TitleBody id={id} title={title} body={body} />
        </CardContent>

        <CommentCategory commentsNum={commentsNum} category={category} />

        <Divider className={classes.secondDividerColor} />

        <CardActions>
          <Vote id={id} voteScore={voteScore} editMode={currentEditingPostId} voteUpOrDown={votePost} />

          <div className={classes.moveRight} />

          <EditDeletePost postId={id} redirectToEditPost={currentEditingPostId === id} />

          <IconButton aria-label="Click Me" className={classes.openPost}>
            <Link to={`/category/${id}`} >
              <Reply className={classes.reply} />
            </Link>
          </IconButton>
        </CardActions>
      </Card>
    )
  }
};

function mapStateToProps(state, ownProps) {
  return {
    currentEditingPostId: state.current.currentEditingPostId,
    ...ownProps
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updatePost: (postObj, category) => dispatch(updatePost(postObj, category)),
    votePost: (postId, upOrDown, category) => dispatch(votePost(postId, upOrDown, category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostCard));
