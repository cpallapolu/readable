
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { TextField, Tooltip, IconButton } from 'material-ui';
import { red } from 'material-ui/colors';
import { Send, Cancel } from 'material-ui-icons';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  titleField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 700
  },
  bodyField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 700
  },
  titleLabel: {
    fontSize: 18
  },
  bodyLabel: {
    fontSize: 18
  },
  send: {
    color: red[500]
  }
});

class EditPostForm extends Component {
  static PropTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    editPost: PropTypes.func.isRequired
  };

  render() {
    const { classes } = this.props;
    const { id, title, body } = this.props;

    return (
      <div>
        <form onSubmit={() => alert('you clicked me')} noValidate autoComplete="off">
          <TextField
            className={classes.titleField}
            labelClassName={classes.titleLabel}
            label="Title"
            defaultValue={title}
            multiline
            rowsMax="3"
            fullWidth
          />
          <br/><br/><br/>
          <TextField
            className={classes.bodyField}
            label="Body"
            defaultValue={body}
            multiline
            rowsMax="5"
            fullWidth
          />
          <Tooltip id="tooltip-fab" title="Submit" placement="top">
            <IconButton type="submit" aria-label="Submit" style={{float: 'right'}}>
              <Send className={classes.send} tooltip="Submit"/>
            </IconButton>
          </Tooltip>
          <Tooltip id="tooltip-fab" title="Cancel" placement="top">
            <IconButton aria-label="Cancel" color="primary">
              <Link to={`/post/${id}` } >
                <Cancel />
              </Link>
            </IconButton>
          </Tooltip>
        </form>
        <br/><br/>
      </div>
    )
  };
}

export default withStyles(styles)(EditPostForm);
