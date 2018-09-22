import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ResponsiveDrawer from './containers/ResponsiveDrawer';
import Home from './containers/Home';
import Info from './containers/Info';

const NotFound = () => {
  return(
    <h2>Page Not Found</h2>
  )
}

class ConcertEntranceApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }

  render () {
    return (
      <div className="App">
        <Router>
          <ResponsiveDrawer>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/info" component={Info} />
              <Route component={NotFound} />
            </Switch>
          </ResponsiveDrawer>
        </Router>
      </div>
    )
  }
}

export default ConcertEntranceApp;
