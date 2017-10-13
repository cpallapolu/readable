
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import { grey } from 'material-ui/colors';
import { Grid, Divider } from 'material-ui';

import PostCard from '../components/PostCard';
import CategoryChip from '../components/CategoryChip';

import { fetchCategories, fetchPosts } from '../state/actions/index';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  dividerColor: {
    'background-color': grey[300]
  },
  chipDiv: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  chipGrid: {
    marginLeft: '2px',
    marginTop: '2px',
    marginBottom: '2px',
    width: '100%'
  },
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

class HomePage extends Component {
  static propTypes = {

  }

  componentWillMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  render() {
    const { classes, categories, posts } = this.props;

    return (
      <div>
        <br />

        <Divider className={classes.dividerColor} />

        <div className={classes.chipDiv}>
          <Grid container className={classes.chipGrid}>
            {
              categories.map((category, index) => (
                <Grid key={index} item>
                  <CategoryChip name={category.name} path={category.path}/>
                </Grid>
              ))
            }
          </Grid>
        </div>

        <Divider className={classes.dividerColor} />
        <br />

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
                    voteScore={post.voteScore} />
                </Grid>
              ))
            }
          </Grid>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories,
    posts: state.posts,
    classes: ownProps.classes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomePage));
