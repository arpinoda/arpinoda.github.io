import React from 'react';
import PropTypes from 'prop-types';
import AUTH from '../util/AUTH';
import withErrorHandler from './withErrorHandler';
import { LOADING_IMAGE, ARROW_RIGHT_IMAGE, nextPathFromHref } from '../util/UI';

/**
 * Grants user access to Home component and its children.
 */
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passcode: '',
    };

    this.auth = new AUTH();
  }

  componentDidMount() {
    /** Redirects user to Home component, if logged in */
    if (this.auth.loggedIn()) {
      const { history } = this.props;
      history.replace('/');
    }
  }

  onInputChange = e => {
    /** Sets the state to text input's value */
    const { target } = e;
    this.setState({
      passcode: target.value,
    });
  };

  handleFormSubmit = e => {
    /** Performs HTTP request for authenticating the user */
    e.preventDefault();
    const { passcode } = this.state;

    if (!passcode) {
      return;
    }

    const { history } = this.props;

    this.auth
      .login(passcode)
      .then(() => {
        const { href } = window.location;
        const redirectTo = nextPathFromHref(href);
        return history.replace(redirectTo);
      })
      .catch(error => {
        let { message } = error;

        if (error.statusCode && error.statusCode === 401) {
          message =
            'Whoops! Passcode is incorrect or has expired.\n\nPlease try again.';
        }

        alert(message); // eslint-disable-line
      });
  };

  onChange = e => {
    // Sets the state's passcode attribute to value in <input>. Fires every time key is pressed
    const { value } = e.target;
    const passcode = value.trim();

    this.setState({ passcode });
  };

  render() {
    const { passcode } = this.state;

    return (
      <div>
        <div className="login-container">
          <div className="embed-submit-field">
            <input
              tabIndex="0"
              onChange={this.onChange}
              type="text"
              placeholder="Enter a passcode"
            />
            <div
              type="button"
              className={
                passcode.length !== 0 ? 'fadeIn button' : 'fadeOut button'
              }
              onClick={this.handleFormSubmit}
              role="button"
              tabIndex="0"
              onKeyDown={() => {}}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="on"
              spellCheck="false"
            >
              <img
                src={ARROW_RIGHT_IMAGE}
                className="svg"
                alt="login"
                style={{
                  height: '40%',
                  marginTop: '60%',
                }}
              />
            </div>
          </div>
        </div>
        <img
          className="display-none"
          src={LOADING_IMAGE}
          alt="preloading asset"
        />
      </div>
    );
  }
}

Login.propTypes = {
  /** Used for redirecting user to Home component */
  history: PropTypes.object,
};

export default withErrorHandler(Login, false);
