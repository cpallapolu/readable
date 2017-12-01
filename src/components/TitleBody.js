
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Typography } from 'material-ui';

import EditForm from './EditForm';

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
    const { id, editMode, update } = this.props;

    return (
      <div>
        {
          editMode ?
            <EditForm id={id} title={title} body={body} update={update}/> :
            <div>
              <Typography type="title" className={classes.title}>
                {title}
              </Typography>
              <Typography component="p">
                {body}
              </Typography>
            </div>
        }
      </div>
    )
  };
}

export default (withStyles(styles)(TitleBody));
