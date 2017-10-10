
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Card, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';

class PostCard extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    voteCount: PropTypes.number.isRequired,

  }

  render() {
    return (
      <Card style={{margin: '10px', width: '300px'}}>
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <IconButton >
          <FontIcon>
            <ThumbDown style={{color: 'rgb(255, 0, 0)'}} />
          </FontIcon>
        </IconButton>
        <IconButton >
          <FontIcon>
            <ThumbUp style={{color: 'rgb(0, 255, 0)'}} />
          </FontIcon>
        </IconButton>
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    )
  }
};

export default PostCard;
