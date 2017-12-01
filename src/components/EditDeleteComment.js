
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { IconButton, Tooltip } from 'material-ui';
import { Cancel } from 'material-ui-icons';

import DeleteIcon from 'material-ui-icons/Delete';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

import { teal } from 'material-ui/colors';

import { deleteComment, setCommentId } from '../state/actions';

const styles = theme => ({
  editMode: { color: teal[400] },
  deleteButton: { margin: `${theme.spacing.unit}px`, marginLeft: `${theme.spacing.unit - 12}px` }
});

class EditDeleteComment extends Component {
  static defaultProps = {

  };

  static PropTypes = {
    id: PropTypes.string.isRequired,
    isEditingComment: PropTypes.bool.isRequired,
    deleteComment: PropTypes.func.isRequired
  };

  handleEditComment = (commentId) => {
    this.props.setCommentId(commentId);
  };

  render() {
    const { classes } = this.props;
    const { id, isEditingComment} = this.props;
    const { deleteComment } = this.props;

    return (
      <div>
        {
          isEditingComment ?
            <Tooltip id="tooltip-fab" title="Cancel" placement="top">
              <IconButton aria-label="Cancel" color="primary" >
                <Cancel onClick={() => this.handleEditComment('')}/>
              </IconButton>
            </Tooltip> :
            <Tooltip id="tooltip-fab" title="Edit" placement="top">
              <IconButton aria-label="Edit" color="primary" >
                <ModeEditIcon className={classes.editMode} onClick={() => this.handleEditComment(id)}/>
              </IconButton>
            </Tooltip>
        }
        <Tooltip id="tooltip-fab" title="Delete" placement="top">
          <IconButton aria-label="Delete Post" color="accent" className={classes.deleteButton}>
            <DeleteIcon onClick={() => deleteComment(id)}/>
          </IconButton>
        </Tooltip>
      </div>
    )
  };

}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCommentId: (commentId) => dispatch(setCommentId(commentId)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditDeleteComment));
