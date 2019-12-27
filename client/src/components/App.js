import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import withErrorHandler from './withErrorHandler';
import Home from './Home';
import Login from './Login';
import WindowDimensionsProvider from './WindowDimensionsProvider';
import '../util/Polyfills';

/**
 * The entry point for our React.js application, called by Index.js
 * Creates two of three application routes. Wrapped in ErrorHandler HOC
 * so all child-component event and render errors are collected and logged.
 */
const App = () => {
  const importAll = r => r.keys().map(r);

  // Force WebPack to include all imagery & videos within 'static' file directory
  importAll(require.context('../static', true, /^\.\//));

  return (
    <WindowDimensionsProvider>
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
    </WindowDimensionsProvider>
  );
};

export default withErrorHandler(App);
