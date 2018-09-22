import React from 'react';
import { render } from 'react-dom';
import { createMuiTheme, MuiThemeProvider  } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: indigo,
    secondary: blue,
  },
});

render(
  <MuiThemeProvider theme={theme} >
    <Router>
      <App/>
    </Router>
  </MuiThemeProvider>,
  document.querySelector('#root')
);
