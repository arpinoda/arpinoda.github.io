import React from 'react';
import PropTypes from 'prop-types';
import AUTH from '../util/AUTH';

const withAuth = AuthComponent => {
  const Auth = new AUTH();

  class AuthWrapped extends React.Component {
    state = {
      confirm: null,
      loaded: false,
    };

    /* In the componentDidMount, we would want to do a couple of
    important tasks in order to verify the current user's
    authentication status prior to granting them enterance into the app. */
    componentDidMount() {
      const { history, location } = this.props;

      if (!Auth.loggedIn()) {
        const { pathname } = location;

        let forwardToPath = '';

        if (pathname && pathname !== '/login') {
          if (!(pathname === '/' && location.hash === '')) {
            forwardToPath += `?next=${pathname}${location.hash}`;
          }
        }

        history.replace(`/login${forwardToPath}`);
      } else {
        /* Try to get confirmation message from the Auth helper. */
        try {
          const decoded = Auth.decodeToken();
          this.setState({
            confirm: decoded,
            loaded: true,
          });
        } catch (err) {
          /* There's an error so we'll print it out and log the
          user out for security reasons. */
          console.log(err);
          Auth.logout();
          history.replace('/login');
        }
      }
    }

    render() {
      const { loaded, confirm } = this.state;
      const { history, location } = this.props;

      if (loaded === true) {
        if (confirm) {
          return (
            /* component that is currently being wrapper(App.js) */
            <AuthComponent
              history={history}
              location={location}
              confirm={confirm}
            />
          );
        }
        return null;
      }

      return null;
    }
  }

  AuthWrapped.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
  };

  return AuthWrapped;
};

export default withAuth;
