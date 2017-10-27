
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import { IconButton, Tooltip } from 'material-ui';
import { Cancel } from 'material-ui-icons';

import DeleteIcon from 'material-ui-icons/Delete';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

import { teal } from 'material-ui/colors';

const styles = theme => ({
  editMode: { color: teal[400] },
  deleteButton: { margin: `${theme.spacing.unit}px`, marginLeft: `${theme.spacing.unit - 12}px` }
});

class EditDelete extends Component {
  static defaultProps = {

  };

  static PropTypes = {
    postId: PropTypes.string.isRequired,
    editMode: PropTypes.bool.isRequired
  };

  render() {
    const { classes } = this.props;
    const { postId, editMode } = this.props;

    return (
      <div>
        {
          editMode ?
            <Tooltip id="tooltip-fab" title="Cancel" placement="top">
              <Link to={`/post/${postId}`} >
                <IconButton aria-label="Cancel" color="primary" >
                  <Cancel />
                </IconButton>
              </Link>
            </Tooltip> :
            <Link to={`/post/edit/${postId}`} >
              <IconButton aria-label="Edit Comment" color="primary" >
                <ModeEditIcon className={classes.editMode} />
              </IconButton>
            </Link>
        }
        <IconButton aria-label="Delete Post" color="accent" className={classes.deleteButton}>
          <DeleteIcon onClick={() => {alert('trying to delete me')}}/>
        </IconButton>
      </div>
    )
  };

}
export default (withStyles(styles)(EditDelete));
