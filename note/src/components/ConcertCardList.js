import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ConcertCard from './ConcertCard';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

function ConcertCardList(props) {
  const { classes, items } = props;
  return (
    <div className={classes.root}>
      {items.map((e, id) => {
        return (
          <ConcertCard key={id} item={e} />
        )
      })}
    </div>
  );
}

ConcertCardList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConcertCardList);
