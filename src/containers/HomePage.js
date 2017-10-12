
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import { grey } from 'material-ui/colors';
import { Grid, Divider } from 'material-ui';

import PostCard from '../components/PostCard';
import CategoryChip from '../components/CategoryChip';

import { getCategories } from '../state/actions/index';

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
    this.props.getCategories();
  }

  render() {
    const { classes } = this.props;

    console.log(this.props);

    return (
      <div>
        <br />

        <Divider className={classes.dividerColor} />

        <div className={classes.chipDiv}>
          <Grid container className={classes.chipGrid}>
            {
              [1, 2, 3, 4, 5].map((item) => (
                <Grid key={item} item>
                  <CategoryChip number={item} />
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
              [1, 2, 3, 4, 5].map((item) => (
                <Grid key={item} item>
                  <PostCard />
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
  console.log('state: ', state.categories);
  return {
    ...state,
    classes: ownProps.classes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: (data) => dispatch(getCategories(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomePage));
