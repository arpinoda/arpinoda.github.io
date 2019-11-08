import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    // Force WebPack to include all imagery within 'static' directory
    this.importAll(require.context('../static', true, /^\.\//));
  }

  importAll = r => r.keys().map(r);

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/login"
            render={routeProps => <Login {...routeProps} />}
          />
          <Route path="/" render={routeProps => <Home {...routeProps} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
