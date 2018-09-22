import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import request from 'superagent'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
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
    const itemsHtml = this.state.items.map(e => (
      <li key={e._id}><a href={e.srcUrl}>{e.title}</a>
        <ul>
          <li>前売開始日: {e.onSaleDate}</li>
          <li>日時: {e.heldDate} {e.heldTime}</li>
          <li>場所: {e.heldPlace}</li>
          <li>{e.description}}</li>
        </ul>
      </li>
    ))
    const updateTimestamp = new Date(this.state.timestamp)
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.grow}>
              Classical Concert Note
            </Typography>
          </Toolbar>
        </AppBar>
        <p>
          最終更新日時：{updateTimestamp.toLocaleString()}
        </p>
        <Button variant="contained" color="primary" onClick={e => this.loadLogs()}>
          Reload
        </Button>
        <ul>{itemsHtml}</ul>
      </div>
    )
  }
}

ConcertEntranceApp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConcertEntranceApp);
