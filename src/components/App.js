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
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route
            path="/"
            render={props => <Home location={props.location} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
