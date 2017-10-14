
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import { deepOrange } from 'material-ui/colors';

import { Chip } from 'material-ui';

import { fetchCategoryPosts } from '../state/actions';

const styles = theme => ({
  link: { 'text-decoration': 'none' },
  chip: { margin: 4, 'text-decoration': 'none', cursor: 'pointer' }
});

class CategoryChip extends Component {
  static defaultProps = {
    selected: false
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired
  };

  handleCategoryChipClick() {
    this.props.fetchCategoryPosts(this.props.name);
  }

  render() {
    const { classes, path, name, selected } = this.props;

    return (
      <Link to={"/category/" + path} className={classes.link}>
        <Chip
          className={classes.chip}
          style={selected ? { backgroundColor: deepOrange[500] } : {}}
          label={name}
          onClick={() => this.handleCategoryChipClick(name) }
        />
      </Link>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return {
    fetchCategoryPosts: (data) => dispatch(fetchCategoryPosts(data))
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(CategoryChip));
