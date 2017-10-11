
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
    number: PropTypes.number.isRequired,
  }

  render() {
    const { classes } = this.props;

    return (
      <Link to="/category" className={classes.link}>
        <Chip
          label={"Category - " + this.props.number}
          className={classes.chip}
        />
      </Link>

    )
  }
};

export default withStyles(styles)(CategoryChip);
