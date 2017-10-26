
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedDate, FormattedTime } from 'react-intl';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import { Grid, Avatar, IconButton, Typography, Badge, Divider, TextField, Tooltip } from 'material-ui';
import { ModeComment, ThumbUp, ThumbDown, Send, Cancel, AccountCircle } from 'material-ui-icons';
import DeleteIcon from 'material-ui-icons/Delete';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import { cyan, grey, red, teal } from 'material-ui/colors';

import CategoryChip from '../components/CategoryChip';
import EditForm from '../components/EditForm';

import { fetchPost, updatePost } from '../state/actions';
import { votePost, UP, DOWN } from '../state/actions';

const styles = theme => ({
  card: { minWidth: 900, maxWidth: 900 },
  title: { marginBottom: 16, color: theme.palette.text.secondary },
  postPageDiv: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' },
  postPageGrid: { width: '100%', margin: '0px', justifyContent: 'space-around' },
  avatar: { color: cyan['A400'] },
  firstDividerColor: { 'background-color': grey[700] },
  secondDividerColor: { 'background-color': grey[700] },
  moveRight: { flex: '1 1 auto' },
  // categoryChip: { margin: `0 ${theme.spacing.unit}px` },
  // voteScoreBadge: { margin: `0 ${theme.spacing.unit - 1}px` },
  // commentsNumBadge: {  },
  thumbDown: { color: red[400] },
  thumbUp: { color: teal[400] },
  editMode: { color: teal[400] },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  commentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 700
  },
  commentLabel: {
    fontSize: 18
  },
  deleteButton: { margin: `${theme.spacing.unit - 0}px` }
});

class PostPage extends Component {
  static propTypes = {

  }

  state = {
    commentIdToEdit: ''
  };

  componentWillMount() {
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
    const { selectedCategory, editMode } = this.props;
    const { votePost } = this.props;
    const { commentIdToEdit } = this.state;

    const hideLoading = Object.keys(this.props.post).length;

    const avatarImage = author && author.length ? author.match(/\b(\w)/g).join('').toUpperCase() : <AccountCircle />;

    return (
      <div className={classes.postPageDiv}>
        <br /><br />
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
                        <div>
                          <Typography type="title" className={classes.title}>
                            {title}
                          </Typography>
                          <Typography component="p">
                            {body}
                          </Typography>
                        </div>
                    }
                  </CardContent>

                  <CardActions>
                    <IconButton aria-label="Click Me" disabled={true}>
                      <Badge badgeContent={comments ? comments.length : 0} color="accent" >
                        <ModeComment style={{color: '#ffffff'}}/>
                      </Badge>
                    </IconButton>
                    <div className={classes.moveRight} />
                    <CategoryChip style={{color: grey[500]}} className={classes.categoryChip} name={category} path={category} />
                  </CardActions>

                  <Divider className={classes.secondDividerColor} />

                  <CardActions >
                    <IconButton aria-label="Thumbs up" disabled={editMode}>
                      <ThumbUp className={classes.thumbUp} onClick={() => votePost(id, UP, selectedCategory)} />
                    </IconButton>
                    <Badge className={classes.voteScoreBadge} badgeContent={voteScore} color="primary" children="" style={{}} />
                    <IconButton aria-label="Thumbs Down" disabled={editMode}>
                      <ThumbDown className={classes.thumbDown} onClick={() => votePost(id, DOWN, selectedCategory)} />
                    </IconButton>
                    <div className={classes.moveRight} />
                    {
                      editMode ?
                        <Tooltip id="tooltip-fab" title="Cancel" placement="top">
                          <Link to={`/post/${id}`} >
                            <IconButton aria-label="Cancel" color="primary" >
                              <Cancel />
                            </IconButton>
                          </Link>
                        </Tooltip> :
                        <Link to={`/post/edit/${id}`} >
                          <IconButton aria-label="Edit Comment" color="primary" >
                            <ModeEditIcon className={classes.editMode} />
                          </IconButton>
                        </Link>
                    }
                    <IconButton aria-label="Delete Post" color="accent" className={classes.deleteButton}>
                      <DeleteIcon onClick={() => {alert('trying to delete me')}}/>
                    </IconButton>
                  </CardActions>
                  <Divider className={classes.firstDividerColor}/>

                  {
                    !editMode &&
                    <div>
                      <CardContent>
                        {
                          !comments.length ?
                            <CardContent>
                              <Typography paragraph type="body2">
                                Be the first one to comment
                              </Typography>
                            </CardContent> :
                            comments.map((comment, index) => (
                              <div key={index}>
                                <CardContent >
                                  <div style={{width:'60px', float:'left'}}>
                                    <Avatar className={classes.avatar}>{author.match(/\b(\w)/g).join('').toUpperCase()}</Avatar>
                                  </div>
                                  <div>
                                    <Typography paragraph type="body2">
                                      {comment.author}<br/>
                                      <FormattedDate value={timestamp} day="numeric" month="long" year="numeric" />{ ' at ' }
                                      <FormattedTime value={timestamp} hour="numeric" minute="numeric" />
                                    </Typography>
                                  </div>
                                  <div>
                                    {comment.id === commentIdToEdit ?
                                      <EditForm id={comment.id} body={comment.body} updatePost={this.props.updateComment}/> :
                                      <Typography paragraph type="body2">
                                        {comment.body}<br/>
                                      </Typography>
                                    }
                                  </div>
                                </CardContent>
                                <CardActions >
                                  <IconButton aria-label="Thumbs up" disabled={editMode} >
                                    <ThumbUp className={classes.thumbUp} />
                                  </IconButton>
                                  <Badge className={classes.voteScoreBadge} badgeContent={comment.voteScore} color="primary" children="" style={{}} />
                                  <IconButton aria-label="Thumbs Down" disabled={editMode} >
                                    <ThumbDown className={classes.thumbDown} />
                                  </IconButton>
                                  <div className={classes.moveRight} />
                                  {
                                    comment.id === this.state.commentIdToEdit ?
                                      <Tooltip id="tooltip-fab" title="Cancel" placement="top">
                                        <IconButton aria-label="Cancel" color="primary" onClick={() => this.handleCancelEditComment()}>
                                          <Cancel />
                                        </IconButton>
                                      </Tooltip> :
                                      <IconButton aria-label="Edit Comment" color="primary" onClick={() => this.handleEditComment(comment.id)}>
                                        <ModeEditIcon />
                                      </IconButton>
                                  }
                                  <IconButton aria-label="Delete Comment" color="accent" disabled={editMode} >
                                    <DeleteIcon />
                                  </IconButton>
                                </CardActions>

                                <Divider className={classes.firstDividerColor} />
                              </div>
                            ))
                        }
                      </CardContent>
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
                    </div>
                  }
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
    selectedCategory: state.categories.selectedCategory.name,
    post: state.posts.selectedPost,
    postId: ownProps.id,
    editMode: ownProps.editMode
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (postId) => dispatch(fetchPost(postId)),
    votePost: (postId, upOrDown, category) => dispatch(votePost(postId, upOrDown, category)),
    updatePost: (postObj, category) => dispatch(updatePost(postObj, category)),
    deletePost: (postObj, category) => dispatch(updatePost(postObj, category)),
    updateComment: (postObj, category) => dispatch(updatePost(postObj, category)),
    deleteComment: (postObj, category) => dispatch(updatePost(postObj, category))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostPage));
