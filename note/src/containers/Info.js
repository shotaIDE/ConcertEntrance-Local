import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    maxWidth: 860,
    padding: 10,
    margin: 'auto',
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: 10,
    marginBottom: 10,
  },
  textLeft: {
    textAlign: 'left',
  },
  paragraph: {
    marginTop: 10,
  },
});

class Info extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Typography variant="display1">
          Classical Concert Note について
        </Typography>
        <div className={classes.textLeft}>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3">
              Classical Concert Note とは
            </Typography>
            <Typography component="p" className={classes.paragraph}>
              クラシックコンサートの情報を多数のサイトから収集して，一覧表示するアプリ．
            </Typography>
          </Paper>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3">
              ソースコード
            </Typography>
            <Typography component="p" className={classes.paragraph}>
              <a href="https://github.com/shotaIDE/ConcertEntrance" target="blank">
                GitHub
              </a>
            </Typography>
          </Paper>
        </div>
      </div>
    );
  }
}

Info.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Info);
