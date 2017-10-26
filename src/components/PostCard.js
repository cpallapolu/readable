
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedDate, FormattedTime } from 'react-intl';
import { withStyles } from 'material-ui/styles';
import { grey, red, teal, cyan } from 'material-ui/colors';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import { Avatar, IconButton, Typography, Badge, Divider } from 'material-ui';
import { ThumbUp, ThumbDown, Reply, ModeComment } from 'material-ui-icons';
import DeleteIcon from 'material-ui-icons/Delete';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

import CategoryChip from '../components/CategoryChip';

import { votePost, UP, DOWN } from '../state/actions';

const styles = theme => ({
  card: { minWidth: 305, maxWidth: 305 },
  title: { marginBottom: 16, color: theme.palette.text.secondary },
  avatar: { color: cyan['A400'] },
  firstDividerColor: { 'background-color': grey[700] },
  secondDividerColor: { 'background-color': grey[700] },
  moveRight: { flex: '1 1 auto' },
  categoryChip: { margin: `0 ${theme.spacing.unit}px` },
  voteScoreBadge: { margin: `0 ${theme.spacing.unit - 1}px` },
  deleteButton: { margin: `${theme.spacing.unit - 23}px` },
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

  state = {
    editMode: false
  }

  handleEditClick = () => {
    this.setState({ editMode: !this.state.editMode });
  };


  render() {
    const { classes } = this.props;
    const { id, title, body, author, timestamp, voteScore, category, commentsNum } = this.props;
    const { votePost } = this.props

    return (
      <Card className={classes.card} raised>
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
          <Typography type="title" className={classes.title}>
            {title}
          </Typography>
          <Typography component="p">
            {body}
          </Typography>
        </CardContent>

        <CardActions>
          <IconButton aria-label="Click Me" disabled={true}>
            <Badge badgeContent={commentsNum} color="accent" >
              <ModeComment style={{color: '#ffffff'}}/>
            </Badge>
          </IconButton>
          <div className={classes.moveRight} />
          {
            category.length &&
            <CategoryChip style={{color: grey[500]}} className={classes.categoryChip} name={category} path={category} />
          }
        </CardActions>

        <Divider className={classes.secondDividerColor} />

        <CardActions >
          <IconButton aria-label="Thumbs up">
            <ThumbUp className={classes.thumbUp} onClick={() => votePost(id, UP)} />
          </IconButton>
          <Badge className={classes.voteScoreBadge} badgeContent={voteScore} color="primary" children="" style={{}} />
          <IconButton aria-label="Thumbs Down">
            <ThumbDown className={classes.thumbDown} onClick={() => votePost(id, DOWN)} />
          </IconButton>
          <div className={classes.moveRight} />
          <IconButton aria-label="Edit Comment" color="primary">
            <Link to={`/post/edit/${id}`} >
              <ModeEditIcon className={classes.editPost} />
            </Link>
          </IconButton>
          <IconButton aria-label="Delete Comment" color="accent" className={classes.deleteButton}>
            <DeleteIcon onClick={() => {alert('trying to delete me')}}/>
          </IconButton>
          <IconButton aria-label="Click Me">
            <Link to={`/post/${id}`} >
              <Reply className={classes.reply} />
            </Link>
          </IconButton>
        </CardActions>
      </Card>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return {
    votePost: (postId, upOrDown, category) => dispatch(votePost(postId, upOrDown, category))
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(PostCard));
