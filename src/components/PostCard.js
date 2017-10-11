
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { grey, red, teal, cyan } from 'material-ui/colors';

import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import { Avatar, IconButton, Typography, Badge, Divider } from 'material-ui';

import { ThumbUp, ThumbDown, Reply } from 'material-ui-icons';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  avatar: {
    color: cyan['A400']
  },
  dividerColor: {
    'background-color': grey[700]
  },
  moveRight: {
    flex: '1 1 auto'
  },
  badge: {
    margin: `0 ${theme.spacing.unit * 3}px`
  },
  thumbDown: {
    color: red[400]
  },
  thumbUp: {
    color: teal[400]
  },
  reply: {
    transform: 'scaleX(-1)'
  }
});

class PostCard extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    voteCount: PropTypes.number.isRequired,

  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>R</Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
        />

        <Divider className={classes.dividerColor} />

        <CardContent>
          <Typography type="body1" className={classes.title}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography component="p">
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </Typography>
        </CardContent>

        <Divider className={classes.dividerColor} />

        <CardActions>
          <Badge className={classes.badge} badgeContent={10} color="primary"/>
          <IconButton aria-label="Thumbs up">
            <ThumbUp className={classes.thumbUp} />
          </IconButton>
          <IconButton aria-label="Thumbs Down">
            <ThumbDown className={classes.thumbDown} />
          </IconButton>
          <div className={classes.moveRight} />
          <IconButton aria-label="Click Me">
            <Reply className={classes.reply} />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
};

export default withStyles(styles)(PostCard);
