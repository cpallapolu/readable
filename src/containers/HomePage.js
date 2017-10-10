
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { grey } from 'material-ui/colors';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';

import PostCard from '../components/PostCard';
import CategoryChip from '../components/CategoryChip';

class HomePage extends Component {
  static propTypes = {

  }

  render() {
    const dividerColor = grey[300];

    return (
      <div>
        <br />
        <Divider style={{'background-color': dividerColor}} />

        <div className={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
          <Grid container style={{'margin-left': '2px', marginTop: '2px', marginBottom: '2px', width: '100%'}}>
            {
              [1, 2, 3, 4, 5].map((item) => (
                <Grid item>
                  <CategoryChip number={item} />
                </Grid>
              ))
            }
          </Grid>
        </div>

        <Divider style={{'background-color': dividerColor}} />

        <div className={{flexGrow: 1, marginTop: 30}}>
          <Grid container style={{width: '100%'}}>
            {
              [1, 2, 3, 4, 5].map(() => (
                <Grid item xs={3}>
                  <PostCard />
                </Grid>
              ))
            }
          </Grid>
        </div>
      </div>
    )
  }
}


export default connect()(HomePage);
