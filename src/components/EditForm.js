
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { TextField, Tooltip, IconButton } from 'material-ui';
import { red } from 'material-ui/colors';
import { Send } from 'material-ui-icons';

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

class EditForm extends Component {
  static defaultProps = {
    title: ''
  };

  static PropTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    updatePost: PropTypes.func.isRequired
  };

  state = {
    fireRedirect: false,
    id: this.props.id,
    title: this.props.title,
    body: this.props.body
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const { id, title, body } = this.state;

    this.props.updatePost({ id, title, body }, this.props.category);

    this.setState({ fireRedirect: true })
  }

  render() {
    const { classes } = this.props;
    const { id, title, body } = this.state;
    const { fireRedirect } = this.state;

    return (
      <div>
        {fireRedirect && (
          <Redirect to={`/post/${id}`}/>
        )}

        <form onSubmit={(e) => this.handleSubmit(e)} noValidate autoComplete="off">
          { title &&
            <div>
              <TextField
                className={classes.titleField}
                labelClassName={classes.titleLabel}
                label="Title"
                defaultValue={title}
                multiline
                rowsMax="3"
                fullWidth
                onChange={this.handleChange('title')}
              />
              <br/><br/><br/>
            </div>
          }
          <TextField
            className={classes.bodyField}
            label="Body"
            defaultValue={body}
            multiline
            rowsMax="5"
            fullWidth
            onChange={this.handleChange('body')}
          />
          <Tooltip id="tooltip-fab" title="Submit" placement="top">
            <IconButton type="submit" aria-label="Submit" style={{float: 'right'}}>
              <Send className={classes.send} tooltip="Submit"/>
            </IconButton>
          </Tooltip>
        </form>
        <br/><br/>
      </div>
    )
  };
}

export default withStyles(styles)(EditForm);
