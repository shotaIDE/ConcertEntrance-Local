import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import request from 'superagent'

import ResponsiveDrawer from './containers/ResponsiveDrawer';
import Home from './containers/Home';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class ConcertEntranceApp extends React.Component {
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
        <ResponsiveDrawer />
        <Home />
      </div>
    )
  }
}

ConcertEntranceApp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConcertEntranceApp);
