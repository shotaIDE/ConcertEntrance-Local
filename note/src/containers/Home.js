import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import request from 'superagent'

import ConcertCardList from '../components/ConcertCardList';
import { Typography } from '@material-ui/core';

const styles = {
  root: {
  },
  container: {
    maxWidth: 860,
    padding: 10,
    margin: 'auto',
  },
  header: {
    textAlign: 'right',
  }
};

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentWillMount () {
    this.loadLogs()
  }

  loadLogs () {
    request
      .get('/api/v1/getConcerts')
      .end((err, data) => {
        if (err) {
          console.error(err)
          return
        }
        this.setState({
          items: data.body.data,
          timestamp: data.body.timestamp
        })
      })
  }

  render () {
    const { classes } = this.props;
    const updateTimestamp = new Date(this.state.timestamp)

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.header}>
            <Typography variant="subheading">
              最終更新日時：{updateTimestamp.toLocaleString()}
            </Typography>
          </div>
          <ConcertCardList items={this.state.items} />
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
