
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'


import { withStyles } from 'material-ui/styles';
import { IconButton, Tooltip } from 'material-ui';
import { Cancel } from 'material-ui-icons';

import DeleteIcon from 'material-ui-icons/Delete';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

import { teal } from 'material-ui/colors';

import { deletePost, setCurrentEditingPostId } from '../state/actions';

const styles = theme => ({
  editMode: { color: teal[400] },
  deleteButton: { margin: `${theme.spacing.unit}px`, marginLeft: `${theme.spacing.unit - 12}px` }
});

class EditDeletePost extends Component {
  handleEditPost = (postId) => {
    this.props.setCurrentEditingPostId(postId);
  };

  state = {
    doRedirect: false,
    to: '/'
  };

  handleDeletePost(postId) {
    this.props.deletePost(postId);

    const { category } = this.props;

    this.setState({ doRedirect: true, to: category ? `/category/${category}` : '/' });
  }

  render() {
    const { classes } = this.props;
    const { redirectToEditPost } = this.props;
    const { currentEditingPostId, postId, category } = this.props;
    const { doRedirect, to } = this.state;

    return (
      <div>
        {
          redirectToEditPost && <Redirect to={`/post/${postId}`}/>
        }
        {
          doRedirect && <Redirect to={to}/>
        }
        {
          currentEditingPostId === postId ?
            <Tooltip id="tooltip-fab" title="Cancel" placement="top">
              <IconButton aria-label="Cancel" color="primary" >
                <Cancel onClick={() => this.handleEditPost('')}/>
              </IconButton>
            </Tooltip> :
            <Tooltip id="tooltip-fab" title="Edit" placement="top">
              <IconButton aria-label="Edit" color="primary" >
                <ModeEditIcon className={classes.editMode} onClick={() => this.handleEditPost(postId)}/>
              </IconButton>
            </Tooltip>
        }
        <Tooltip id="tooltip-fab" title="Delete" placement="top">
          <IconButton aria-label="Delete Post" color="accent" className={classes.deleteButton}>
            <DeleteIcon onClick={() => this.handleDeletePost(postId)}/>
          </IconButton>
        </Tooltip>
      </div>
    )
  };

}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    currentEditingPostId: state.current.currentEditingPostId,
    category: state.current.category
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentEditingPostId: (currentEditingPostId) => dispatch(setCurrentEditingPostId(currentEditingPostId)),
    deletePost: (postId) => dispatch(deletePost(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditDeletePost));
