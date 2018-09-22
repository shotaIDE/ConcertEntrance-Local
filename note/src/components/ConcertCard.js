import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';

const styles = theme => ({
  card: {
    maxWidth: 860,
    margin: 'auto',
    marginTop: 10,
    marginBottom: 10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class ConcertCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, item } = this.props;
    const heldDatetime = (item.heldDate && item.heldTime) ?
      item.heldDate + " " + item.heldTime : "";
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          title={item.title}
          subheader={heldDatetime}
        />
        <CardContent>
          <Typography component="p">
            前売開始日：{item.onSaleDate}
          </Typography>
          <Typography component="p">
            開催場所：{item.heldPlace}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="お気に入りに追加">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="ブラウザで開く" href={item.srcUrl} target="concert_detail">
            <OpenInBrowser />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="もっと見る"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {item.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

ConcertCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConcertCard);
