
import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';
import { FormattedDate, FormattedTime } from 'react-intl';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import { Grid, Avatar, IconButton, Divider, TextField, Tooltip } from 'material-ui';
import { Send, AccountCircle } from 'material-ui-icons';
import { cyan, grey, red, teal } from 'material-ui/colors';

import EditDeletePost from './EditDeletePost';
import TitleBody from './TitleBody';
import Vote from './Vote';
import CommentCategory from './CommentCategory';
import CommentCard from './CommentCard';
import CustomDialog from './CustomDialog';

import { fetchPost, updatePost, setPage, setCategory } from '../state/actions';
import { addComment, votePost, voteComment, POST_PAGE } from '../state/actions';

const styles = theme => ({
  card: { minWidth: 900 },
  title: { marginBottom: 16, color: theme.palette.text.secondary },
  postPageDiv: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' },
  postPageGrid: { width: '100%', margin: '0px', justifyContent: 'space-around' },
  avatar: { color: cyan['A400'] },
  firstDividerColor: { 'background-color': grey[700] },
  secondDividerColor: { 'background-color': grey[700] },
  moveRight: { flex: '1 1 auto' },
  thumbDown: { color: red[400] },
  thumbUp: { color: teal[400] },
  editMode: { color: teal[400] },
  commentField: { marginLeft: theme.spacing.unit, marginRight: theme.spacing.unit, width: 700 },
  commentLabel: { fontSize: 18 },
  deleteButton: { margin: `${theme.spacing.unit - 0}px` }
});

class PostPage extends Component {
  static propTypes = {

  }

  state = {
    commentBody: ''
  };

  componentWillMount() {
    this.props.setPage(POST_PAGE);
    this.props.fetchPost(this.props.postId);
  }

  componentWillReceiveProps(nextProps) {
    this.props.setCategory(nextProps.post.category);
  }

  handleAddComment = (e) => {
    this.setState({ commentBody: e.target.value });
  };

  handleSubmitComment = () => {
    this.props.addComment(this.state.commentBody);
    this.setState({ commentBody: '' });
  };

  render() {
    const { classes } = this.props;
    const { id, author, title, body, timestamp, category, voteScore, comments } = this.props.post;
    const { currentEditingPostId, doRedirect } = this.props;
    const { votePost, voteComment } = this.props;
    const { commentBody } = this.state;

    const hideLoading = Object.keys(this.props.post).length;

    const avatarImage = author && author.length ? author.match(/\b(\w)/g).slice(0, 2).join('').toUpperCase() : <AccountCircle />;

    return (
      <div className={classes.postPageDiv}>
        { !hideLoading && !doRedirect && <h2>Loading...</h2> }
        { !hideLoading && doRedirect && <CustomDialog open={true} title={'The requested post is deleted'} contentText={'Please select on the below options'}/>}
        {
          hideLoading &&
            <Grid container className={classes.postPageGrid}>
              <Grid item>
                <Card className={classes.card} raised>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="Author Titles" className={classes.avatar}>{avatarImage}</Avatar>
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

                  <CardContent>
                    <TitleBody editMode={currentEditingPostId === id} id={id} title={title} body={body} update={this.props.updatePost} />
                  </CardContent>

                  <CommentCategory commentsNum={comments.length} category={category} />

                  <Divider className={classes.secondDividerColor} />

                  <CardActions>
                    <Vote id={id} voteScore={voteScore} editMode={currentEditingPostId} voteUpOrDown={votePost} />

                    <div className={classes.moveRight} />

                    <EditDeletePost postId={id} inEditMode={currentEditingPostId} />
                  </CardActions>

                  <Divider className={classes.firstDividerColor}/>

                  {
                    comments.map((comment) => (
                      <CommentCard
                        key={comment.id}
                        id={comment.id}
                        postId={id}
                        author={comment.author}
                        body={comment.body}
                        timestamp={comment.timestamp}
                        voteScore={comment.voteScore}
                        voteComment={_.partialRight(voteComment, id)}
                      />
                    ))
                  }

                  <CardContent>
                    <div>
                      <TextField
                        className={classes.commentField}
                        labelClassName={classes.commentLabel}
                        value={this.state.commentBody}
                        label="Start Comment Here"
                        placeholder="Start Comment here"
                        rows="3"
                        fullWidth
                        onChange={(e) => this.handleAddComment(e)}
                      />
                      <Tooltip id="tooltip-fab" title="Submit" placement="top">
                        <IconButton type="submit" aria-label="Submit" style={{float: 'right'}} disabled={commentBody.length === 0} >
                          <Send className={classes.send} onClick={() => this.handleSubmitComment()} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.current.post,
    currentEditingPostId: state.current.currentEditingPostId,
    doRedirect: state.current.doRedirect,
    postId: ownProps.id,
    editMode: ownProps.editMode
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPage: (page) => dispatch(setPage(page)),
    fetchPost: (postId) => dispatch(fetchPost(postId)),
    votePost: (postId, upOrDown) => dispatch(votePost(postId, upOrDown)),
    updatePost: (postObj, category) => dispatch(updatePost(postObj, category)),
    setCategory: (category) => dispatch(setCategory(category)),
    voteComment: (commentId, upOrDown, postId) => dispatch(voteComment(commentId, upOrDown, postId)),
    addComment: (postObj, category) => dispatch(addComment(postObj, category))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostPage));
