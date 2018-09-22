import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import request from 'superagent'

import ConcertCardList from '../components/ConcertCardList';

const styles = {
  root: {
  },
  container: {
    maxWidth: 860,
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
            <p>
              最終更新日時：{updateTimestamp.toLocaleString()}
            </p>
            <Button variant="contained" color="primary" onClick={() => this.loadLogs()}>
              コンサート情報再取得
            </Button>
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
