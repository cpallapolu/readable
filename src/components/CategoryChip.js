
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';

import { Chip } from 'material-ui';

const styles = theme => ({
  link: { 'text-decoration': 'none' },
  chip: { margin: 4, 'text-decoration': 'none', cursor: 'pointer' }
});

class CategoryChip extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  }

  render() {
    const { classes, path, name } = this.props;

    return (
      <Link to={"/category/" + path} className={classes.link}>
        <Chip
          className={classes.chip}
          label={name}
        />
      </Link>

    )
  }
};

export default withStyles(styles)(CategoryChip);
