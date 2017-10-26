
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { Grid } from 'material-ui';

import PostCard from './PostCard';

const styles = theme => ({
  postCardDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  postCardGrid: {
    width: '100%',
    margin: '0px',
    justifyContent: 'space-around'
  }
});

class PostsGrid extends Component {
  static defaultProps = {
    selectedCategory: ''
  };

  static PropTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired,
      comments: PropTypes.number.isRequired
    })).isRequired
  };

  render() {
    const { classes } = this.props;
    const { posts } = this.props;

    return (
      <div className={classes.postCardDiv}>
        <Grid container className={classes.postCardGrid}>
          {
            posts.map((post, index) => (
              <Grid key={index} item>
                <PostCard
                  id={post.id}
                  title={post.title}
                  body={post.body}
                  author={post.author}
                  timestamp={post.timestamp}
                  category={post.category}
                  voteScore={post.voteScore}
                  commentsNum={post.comments.length}
                />
              </Grid>
            ))
          }
        </Grid>
      </div>
    )
  };
}

function mapStateToProps(state, ownProps) {
  return {
    posts: ownProps.posts
  }
}

export default connect(mapStateToProps)(withStyles(styles)(PostsGrid));
