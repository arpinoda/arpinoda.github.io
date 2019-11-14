import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import withErrorHandler from './withErrorHandler';
import Home from './Home';
import Login from './Login';

/**
 * The entry point for our React.js application, called by Index.js
 * Creates two of three application routes. Wrapped in ErrorHandler HOC
 * so all child-component event and render errors are collected and logged.
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    // Force WebPack to include all imagery & videos within 'static' file directory
    this.importAll(require.context('../static', true, /^\.\//));
  }

  importAll = r => r.keys().map(r);

  render() {
    const { setEventError } = this.props;
    const customProps = {
      setEventError,
    };

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/login"
            render={routeProps => <Login {...routeProps} {...customProps} />}
          />
          <Route
            path="/"
            render={routeProps => <Home {...routeProps} {...customProps} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  setEventError: PropTypes.func,
};

export default withErrorHandler(App);
