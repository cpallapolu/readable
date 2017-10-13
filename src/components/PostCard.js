
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedDate } from 'react-intl';

import { withStyles } from 'material-ui/styles';
import { grey, red, teal, cyan } from 'material-ui/colors';

import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import { Avatar, IconButton, Typography, Badge, Divider } from 'material-ui';

import { ThumbUp, ThumbDown, Reply } from 'material-ui-icons';

const styles = theme => ({
  card: { minWidth: 305, maxWidth: 305 },
  title: { marginBottom: 16, fontSize: 14, color: theme.palette.text.secondary },
  avatar: { color: cyan['A400'] },
  firstDividerColor: { 'background-color': grey[700] },
  secondDividerColor: { 'background-color': grey[700] },
  moveRight: { flex: '1 1 auto' },
  badge: { margin: `0 ${theme.spacing.unit * 3}px` },
  thumbDown: { color: red[400] },
  thumbUp: { color: teal[400] },
  reply: { transform: 'scaleX(-1)', color: grey[50] }
});

class PostCard extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    voteScore: PropTypes.number.isRequired
  }

  render() {
    const { classes } = this.props;
    const { id, title, body, author, timestamp, voteScore } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>{author.match(/\b(\w)/g).join('').toUpperCase()}</Avatar>
        }
        title={author}
        subheader={<FormattedDate value={timestamp} day="numeric" month="long" year="numeric" />}
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

        <Divider className={classes.secondDividerColor} />

        <CardActions >
          <Badge className={classes.badge} badgeContent={voteScore} color="primary" children="" />
          <IconButton aria-label="Thumbs up">
            <ThumbUp className={classes.thumbUp} />
          </IconButton>
          <IconButton aria-label="Thumbs Down">
            <ThumbDown className={classes.thumbDown} />
          </IconButton>
          <div className={classes.moveRight} />
          <IconButton aria-label="Click Me">
            <Link to={"/post/" + id} >
              <Reply className={classes.reply} />
            </Link>
          </IconButton>
        </CardActions>
      </Card>
    )
  }
};

export default withStyles(styles)(PostCard);
