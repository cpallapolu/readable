
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Chip from 'material-ui/Chip';



class CategoryChip extends Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
  }

  render() {
    return (
      <Chip onClick={() => alert('you click me chip!!')} style={{margin: 4}} >
        Category - {this.props.number}
      </Chip>
    )
  }
};

export default CategoryChip;
