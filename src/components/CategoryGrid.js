
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { grey } from 'material-ui/colors';
import PropTypes from 'prop-types';
import { Grid, Divider } from 'material-ui';

import CategoryChip from './CategoryChip';

const styles = theme => ({
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
  dividerColor: {
    'background-color': grey[300]
  }
});

class CategoryGrid extends Component {
  static defaultProps = {
    currentCategory: ''
  };

  static PropTypes = {
    currentCategory: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      selected: PropTypes.bool
    })).isRequired
  };

  render() {
    const { classes } = this.props;
    const { categories, currentCategory } = this.props;

    return (
      <div>
        <br />
        <Divider className={classes.dividerColor} />

        <div className={classes.chipDiv}>
          <Grid container className={classes.chipGrid}>
            {
              categories.map((category, index) => (
                <Grid key={index} item>
                  <CategoryChip name={category.name} path={category.path} selected={category.name === currentCategory}/>
                </Grid>
              ))
            }
          </Grid>
        </div>

        <Divider className={classes.dividerColor} />
        <br />
      </div>
    )
  };
}

function mapStateToProps(state, ownProps) {
  return {
    currentCategory: state.current.category,
    categories: ownProps.categories
  }
};

export default connect(mapStateToProps)(withStyles(styles)(CategoryGrid));
