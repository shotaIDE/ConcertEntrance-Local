import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
});

const WrapMainContent = (WrappedComponent, options = {}) => {
  const HOC = class extends React.Component {
    render() {
      const { classes, ...other_props } = this.props;
      return (
        <Scrollbars>
          <div className={classes.wrapper}>
            <WrappedComponent {...other_props} />
          </div>
        </Scrollbars>
      );
    }
  };

  return (
      withStyles(styles, { withTheme: true })(HOC)
  );
};

export default WrapMainContent;
