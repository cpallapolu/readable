
import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';
import { FormattedDate, FormattedTime } from 'react-intl';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import { Grid, Avatar, IconButton, Divider, TextField, Tooltip } from 'material-ui';
import { Send, AccountCircle } from 'material-ui-icons';
import { cyan, grey, red, teal } from 'material-ui/colors';

import EditForm from '../components/EditForm';
import TitleBody from '../components/TitleBody';
import VoteEditDelete from '../components/VoteEditDelete';
import CommentCategory from '../components/CommentCategory';
import CommentCard from '../components/CommentCard';

import { fetchPost, updatePost, setPage } from '../state/actions';
import { votePost, voteComment, POST_PAGE } from '../state/actions';

const styles = theme => ({
  card: { minWidth: 900, maxWidth: 900 },
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
    commentIdToEdit: ''
  };

  componentWillMount() {
    this.props.setPage(POST_PAGE)
    this.props.fetchPost(this.props.postId);
  }

  handleEditComment = (commentIdToEdit) => {
    this.setState({ commentIdToEdit });
  };

  handleCancelEditComment = () => {
    this.setState({ commentIdToEdit: '' });
  };

  render() {
    const { classes } = this.props;
    const { id, author, title, body, timestamp, category, voteScore, comments } = this.props.post;
    const { editMode } = this.props;
    const { votePost, voteComment } = this.props;
    const { commentIdToEdit } = this.state;

    const hideLoading = Object.keys(this.props.post).length;

    const avatarImage = author && author.length ? author.match(/\b(\w)/g).slice(0, 2).join('').toUpperCase() : <AccountCircle />;

    return (
      <div className={classes.postPageDiv}>
        {
          !hideLoading &&
            <h2>Loading...</h2>
        }
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
                    {
                      editMode ?
                        <EditForm id={id} title={title} body={body} updatePost={this.props.updatePost}/> :
                        <TitleBody title={title} body={body} />
                    }
                  </CardContent>

                  <CommentCategory commentsNum={comments.length} category={category} />

                  <Divider className={classes.secondDividerColor} />

                  <VoteEditDelete id={id} voteScore={voteScore} editMode={editMode} voteUpOrDown={votePost} />

                  <Divider className={classes.firstDividerColor}/>

                  {
                    comments.map((comment) => (
                      <CommentCard
                        key={comment.id}
                        id={comment.id}
                        author={comment.author}
                        body={comment.body}
                        timestamp={comment.timestamp}
                        voteScore={comment.voteScore}
                        editMode={comment.id === commentIdToEdit}
                        voteComment={_.partialRight(voteComment, id)}
                      />
                    ))
                  }

                  <CardContent>
                    <div>
                      <TextField
                        className={classes.commentField}
                        labelClassName={classes.commentLabel}
                        label="Start Comment Here"
                        placeholder="Start Comment here"
                        multiline
                        rows="3"
                        fullWidth
                        onChange={() => {}}
                      />
                      <Tooltip id="tooltip-fab" title="Submit" placement="top">
                        <IconButton type="submit" aria-label="Submit" style={{float: 'right'}} >
                          <Send className={classes.send} tooltip="Submit"/>
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
    deletePost: (postObj, category) => dispatch(updatePost(postObj, category)),
    voteComment: (commentId, upOrDown, postId) => dispatch(voteComment(commentId, upOrDown, postId)),
    updateComment: (postObj, category) => dispatch(updatePost(postObj, category)),
    deleteComment: (postObj, category) => dispatch(updatePost(postObj, category))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostPage));
