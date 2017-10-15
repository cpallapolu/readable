
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedDate, FormattedTime } from 'react-intl';
import classnames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import { Grid, Avatar, IconButton, Typography, Badge, Divider, TextField, Tooltip } from 'material-ui';
import Collapse from 'material-ui/transitions/Collapse';
import { ModeComment, ThumbUp, ThumbDown, Send } from 'material-ui-icons';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import DeleteIcon from 'material-ui-icons/Delete';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import { cyan, grey, red, teal } from 'material-ui/colors';

import CategoryChip from '../components/CategoryChip';

import { fetchPost } from '../state/actions';

const styles = theme => ({
  card: { minWidth: 900, maxWidth: 900, textAlign: 'center' },
  title: { marginBottom: 16, fontSize: 14, color: theme.palette.text.secondary },
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
  // reply: { transform: 'scaleX(-1)', color: grey[50] },
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
    const { author, title, body, timestamp, category, voteScore, comments } = this.props.post;

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
                  <Typography type="body1" className={classes.title}>
                    {title}
                  </Typography>
                  <Typography component="p">
                    {body}
                  </Typography>
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
                  <IconButton aria-label="Thumbs up">
                    <ThumbUp className={classes.thumbUp} />
                  </IconButton>
                  <Badge className={classes.voteScoreBadge} badgeContent={voteScore} color="primary" children="" style={{}} />
                  <IconButton aria-label="Thumbs Down">
                    <ThumbDown className={classes.thumbDown} />
                  </IconButton>
                  <div className={classes.moveRight} />
                  <IconButton
                    className={classnames(classes.expand, { [classes.expandOpen]: this.state.expanded })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                  <Divider className={classes.firstDividerColor} />

                  <h2>Make Comments...</h2>

                  <div>
                    <TextField multiline={true} rows="10" value="hello type text her"/>
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
                      <div>
                        <Divider className={classes.firstDividerColor} />

                        <CardContent key={index} >
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
    postId: ownProps.match.params.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (data) => dispatch(fetchPost(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostPage));
