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
        const nextURL = this.getNextURL(location);
        history.replace(`/login${nextURL}`);
      } else {
        /* Try to get confirmation message from the Auth helper. */
        try {
          const decoded = Auth.decodeToken();
          this.setState({
            confirm: decoded,
            loaded: true,
          });
        } catch (err) {
          /* There's an error from Server. Confirm it's a 4XX & log the
          user out for security reasons. */
          console.log(err);
          Auth.logout();
          history.replace('/login');
        }
      }
    }

    getNextURL = location => {
      let result = '';
      const { pathname } = location;

      if (pathname && pathname !== '/login') {
        if (!(pathname === '/' && location.hash === '')) {
          result += `?next=${pathname}${location.hash}`;
        }
      }

      return result;
    };

    render() {
      const { loaded, confirm } = this.state;

      if (loaded === true) {
        if (confirm) {
          const { history, location } = this.props;

          return (
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
