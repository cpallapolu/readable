
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Chip from 'material-ui/Chip';

class CategoryChip extends Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
  }

  render() {
    return (
      <Chip label={"Category - " + this.props.number} onClick={() => alert('you click me chip!!')} style={{margin: 4}} />
    )
  }
};

export default CategoryChip;
