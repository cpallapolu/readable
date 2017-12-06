
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import uuid from 'uuid/v4';

import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import MenuItem from 'material-ui/Menu/MenuItem';
import Button from 'material-ui/Button';
import { Grid, Divider, TextField } from 'material-ui';
import { grey } from 'material-ui/colors';
import { Send } from 'material-ui-icons';

import { addPost } from '../state/actions'

const styles = theme => ({
  newPostPageGrid: { width: '100%', margin: '0px', justifyContent: 'space-around' },
  card: { minWidth: 900, maxWidth: 900 },
  firstDividerColor: { 'background-color': grey[700] },
  titleField: { marginLeft: theme.spacing.unit, marginRight: theme.spacing.unit, marginTop: theme.spacing.unit * 3 },
  titleLabel: { fontSize: 18 },
  menu: { width: 200 },
  formControl: { margin: theme.spacing.unit * 3 },
  rightIcon: { marginLeft: theme.spacing.unit },
  button: { margin: theme.spacing.unit }
});

class NewPostPage extends Component {
  static propTypes = {

  }

  state = {
    disableSubmit: true,
    fireRedirect: false,
    errors: {
      author: false,
      title: false,
      body: false,
      category: false
    },
    formValues: {
      author: '',
      title: '',
      body: '',
      category: ''
    }
  };

  handleChange(fieldName, event) {
    const errors = _.assign({}, this.state.errors);
    const formValues = _.assign({}, this.state.formValues);
    let disableSubmit = this.state.disableSubmit;

    const value = event.target.value;

    formValues[fieldName] = value;
    errors[fieldName] = !value ? true : false;

    disableSubmit = _.compact(_.values(formValues)).length === _.size(formValues) ? false : true;

    this.setState({ disableSubmit, errors, formValues });
  };

  handleSubmit(event) {
    event.preventDefault();

    const id = uuid();

    const postObj = _.assign({ id }, this.state.formValues);

    this.props.addPost(postObj);

    this.setState({ fireRedirect: true, id });
  }

  render() {
    const { classes } = this.props;
    const { categories } = this.props;
    const { formValues } = this.state;
    const { errors } = this.state;
    const { disableSubmit, fireRedirect, id } = this.state;

    return (
      <div>
        {fireRedirect && (
          <Redirect to={`/category/${id}`}/>
        )}

        <Grid container className={classes.newPostPageGrid}>
          <Grid item>
            <Card className={classes.card} raised>
              <CardHeader
                title={'Create New Post'}
              />

              <Divider className={classes.firstDividerColor} />

              <CardContent>
                <form onSubmit={(e) => this.handleSubmit(e)} noValidate autoComplete="off">
                  <TextField
                    className={classes.titleField}
                    labelClassName={classes.titleLabel}
                    label="Name"
                    defaultValue={formValues.author}
                    multiline
                    rowsMax="3"
                    fullWidth
                    onChange={(e) => this.handleChange('author', e)}
                    error={errors['author']}
                    helperText={errors['author'] ? "Required" : ""}
                  />
                  <TextField
                    className={classes.titleField}
                    labelClassName={classes.titleLabel}
                    label="Title"
                    defaultValue={formValues.title}
                    multiline
                    rowsMax="3"
                    fullWidth
                    onChange={(e) => this.handleChange('title', e)}
                    error={errors['title']}
                    helperText={errors['title'] ? "Required" : ""}
                  />
                  <TextField
                    className={classes.titleField}
                    labelClassName={classes.titleLabel}
                    label="Body"
                    defaultValue={formValues.body}
                    multiline
                    rowsMax="3"
                    fullWidth
                    onChange={(e) => this.handleChange('body', e)}
                    error={errors['body']}
                    helperText={errors['body'] ? "Required" : ""}
                  />
                  <TextField
                    select
                    label="Please select a category"
                    className={classes.titleField}
                    value={formValues.category || "None"}
                    onChange={(e) => this.handleChange('category', e)}
                    fullWidth
                    error={errors['category']}
                    helperText={errors['category'] ? "Required" : ""}
                    margin="normal"
                  >
                    {categories.map(option => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Button type="submit" className={classes.button} disabled={disableSubmit} raised color="primary">
                    Send <Send className={classes.rightIcon} />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (postObj) => dispatch(addPost(postObj))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewPostPage));
