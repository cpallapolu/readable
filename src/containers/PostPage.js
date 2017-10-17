
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedDate, FormattedTime } from 'react-intl';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import { Grid, Avatar, IconButton, Typography, Badge, Divider, TextField, Tooltip } from 'material-ui';
import Collapse from 'material-ui/transitions/Collapse';
import { ModeComment, ThumbUp, ThumbDown, Send } from 'material-ui-icons';
import DeleteIcon from 'material-ui-icons/Delete';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import { cyan, grey, red, teal } from 'material-ui/colors';

import CategoryChip from '../components/CategoryChip';
import EditPostForm from '../components/EditPostForm';

import { fetchPost } from '../state/actions';

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
  editPost: { color: teal[400] },
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
  }
});

class PostPage extends Component {
  static propTypes = {

  }

  state = { expanded: true };

  componentWillMount() {
    this.props.fetchPost(this.props.postId);
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes } = this.props;
    const { id, author, title, body, timestamp, category, voteScore, comments } = this.props.post;
    const { editMode } = this.props;
    console.log(this.props);

    return (
      <div className={classes.postPageDiv}>
        <br /><br />
        {
          Object.keys(this.props.post).length &&
          <Grid container className={classes.postPageGrid}>
            <Grid item>
              <Card className={classes.card}>
                <CardHeader
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

                <CardContent>
                  {
                    editMode ?
                      <EditPostForm id={id} title={title} body={body} /> :
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
                    <ThumbUp className={classes.thumbUp} />
                  </IconButton>
                  <Badge className={classes.voteScoreBadge} badgeContent={voteScore} color="primary" children="" style={{}} />
                  <IconButton aria-label="Thumbs Down" disabled={editMode}>
                    <ThumbDown className={classes.thumbDown} />
                  </IconButton>
                  <div className={classes.moveRight} />
                  <IconButton aria-label="Edit Comment" color="primary" disabled={editMode}>
                    <Link to={`/post/edit/${id}` } >
                      <ModeEditIcon className={classes.editPost} />
                    </Link>
                  </IconButton>
                  <IconButton aria-label="Delete Comment" color="accent">
                    <DeleteIcon onClick={() => {alert('trying to delete me')}}/>
                  </IconButton>
                </CardActions>
                <Collapse in={!editMode} transitionDuration="auto" unmountOnExit>
                  <Divider className={classes.firstDividerColor} />

                  <h2>Make Comments...</h2>

                  <div>
                    <TextField multiline={true} rows="10" value="hello type text her" fullWidth/>
                    <Tooltip id="tooltip-fab" title="Submit" placement="left">
                      <IconButton aria-label="Submit">
                        <Send className={classes.thumbUp} tooltip="Submit"/>
                      </IconButton>
                    </Tooltip>
                  </div>

                  <Divider className={classes.firstDividerColor} />
                  <h2>Comments...</h2>
                  {
                    comments.length && comments.map((comment, index) => (
                      <div key={index}>
                        <Divider className={classes.firstDividerColor} />

                        <CardContent >
                          <Avatar className={classes.avatar}>{author.match(/\b(\w)/g).join('').toUpperCase()}</Avatar>
                          <Typography paragraph type="body2">
                            {comment.body} {' by '} {comment.author} {' on '}
                            <FormattedDate value={timestamp} day="numeric" month="long" year="numeric" />{ ' at ' }
                            <FormattedTime value={timestamp} hour="numeric" minute="numeric" />
                          </Typography>
                        </CardContent>
                        <CardActions >
                          <IconButton aria-label="Thumbs up">
                            <ThumbUp className={classes.thumbUp} />
                          </IconButton>
                          <Badge className={classes.voteScoreBadge} badgeContent={comment.voteScore} color="primary" children="" style={{}} />
                          <IconButton aria-label="Thumbs Down">
                            <ThumbDown className={classes.thumbDown} />
                          </IconButton>
                          <div className={classes.moveRight} />
                          <IconButton aria-label="Edit Comment" color="primary">
                            <ModeEditIcon />
                          </IconButton>
                          <IconButton aria-label="Delete Comment" color="accent">
                            < DeleteIcon/>
                          </IconButton>
                        </CardActions>
                      </div>
                    ))
                  }
                </Collapse>
              </Card>

            </Grid>
          </Grid>
        }

        {
          !Object.keys(this.props.post) && <h2>Locading...</h2>
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts.selectedPost,
    postId: ownProps.id,
    editMode: ownProps.editMode
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (postId) => dispatch(fetchPost(postId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostPage));
