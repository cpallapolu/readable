
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { withStyles } from 'material-ui/styles';
import { grey } from 'material-ui/colors';
import PropTypes from 'prop-types';
import { Grid, Divider, Button, Popover, Typography } from 'material-ui';
import List, { ListItem, ListItemText } from 'material-ui/List';

import { Sort } from 'material-ui-icons';

import CategoryChip from './CategoryChip';

import { sortPosts } from '../state/actions';

const styles = theme => ({
  chipDiv: { flexGrow: 1, marginTop: 30 },
  row: { display: 'inline-flex', justifyContent: 'center', flexWrap: 'wrap' },
  chipGrid: { marginLeft: '2px', marginTop: '2px', marginBottom: '2px', width: '100%' },
  dividerColor: { 'background-color': grey[300] },
  titleField: { color: 'red', marginLeft: theme.spacing.unit, marginRight: theme.spacing.unit, marginTop: theme.spacing.unit * 3 },
  labelField: { color: 'red' },
  listFull: { width: 250 },
  button: { float: 'right', marginRight: '10px', width: 'fit-content', height: '32px', fontSize: '0.8125rem' }
});

class CategoryGrid extends Component {
  static defaultProps = {
    currentCategory: ''
  };

  static PropTypes = {
    currentCategory: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      selected: PropTypes.bool
    })).isRequired
  };

  state = {
    open: false,
    anchorEl: null
  };

  handleClickButton() {
    this.setState({
      open: true,
      anchorEl: findDOMNode(this.button),
    });
  };

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  handleSortOption(type, order) {
    this.props.sortPosts(type, order);
    this.handleRequestClose();
  }

  button = null;

  render() {
    const { classes } = this.props;
    const { categories, currentCategory } = this.props;
    const { open, anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={9}>
            <div className={classes.row}>
              {
                categories.map((category, index) => (
                  <CategoryChip key={index} name={category.name} path={category.path} selected={category.name === currentCategory}/>
                ))
              }
            </div>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button className={classes.button} raised onClick={() => this.handleClickButton()}
              ref={(node) => { this.button = node; }}
            >
              <Sort /> Sort By
            </Button>
            <Popover
              open={open}
              anchorEl={anchorEl}
              anchorReference={"anchorEl"}
              anchorPosition={{ top: 200, left: 400 }}
              onRequestClose={() => this.handleRequestClose()}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Typography className={classes.typography}>
                <List>
                  <ListItem button onClick={() => this.handleSortOption('timestamp', 'desc')}>
                    <ListItemText primary="Date: New to Old" />
                  </ListItem>
                  <ListItem button onClick={() => this.handleSortOption('timestamp', 'asc')}>
                    <ListItemText primary="Date: Old to New" />
                  </ListItem>
                  <ListItem button onClick={() => this.handleSortOption('comments', 'desc')}>
                    <ListItemText primary="Comments: High to Low" />
                  </ListItem>
                  <ListItem button onClick={() => this.handleSortOption('comments', 'asc')}>
                    <ListItemText primary="Comments: Low to High" />
                  </ListItem>
                  <ListItem button onClick={() => this.handleSortOption('voteScore', 'desc')}>
                    <ListItemText primary="Votes: High to Low" />
                  </ListItem>
                  <ListItem button onClick={() => this.handleSortOption('voteScore', 'asc')}>
                    <ListItemText primary="Votes: Low to High" />
                  </ListItem>
                </List>
              </Typography>
            </Popover>
          </Grid>
        </Grid>
        <br />
        <Divider className={classes.dividerColor} />
        <br />
      </div>
    )
  };
}

function mapStateToProps(state, ownProps) {
  return {
    currentCategory: state.current.category,
    categories: ownProps.categories
  }
};

function mapDispatchToProps(dispatch) {
  return {
    sortPosts: (type, order) => dispatch(sortPosts(type, order)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoryGrid));
