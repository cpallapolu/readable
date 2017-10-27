
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Typography } from 'material-ui';

const styles = theme => ({
  title: { marginBottom: 16, color: theme.palette.text.secondary }
});

class TitleBody extends Component {
  static defaultProps = {

  };

  static PropTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.number.isRequired
  };

  render() {
    const { classes } = this.props;
    const { title, body } = this.props;

    return (
      <div>
        <Typography type="title" className={classes.title}>
          {title}
        </Typography>
        <Typography component="p">
          {body}
        </Typography>
      </div>
    )
  };
}

export default (withStyles(styles)(TitleBody));
