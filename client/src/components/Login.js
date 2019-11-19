import React from 'react';
import PropTypes from 'prop-types';
import AUTH from '../util/AUTH';
import LoginInput from './LoginInput';
import { LOADING_IMAGE, nextPathFromHref } from '../util/UI';

/**
 * Grants user access to Home component and its children.
 */
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passcode: '',
      isSubmitting: false,
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

  onSubmit = e => {
    /** Performs HTTP request for authenticating the user */
    e.preventDefault();
    const { passcode, isSubmitting } = this.state;

    if (!passcode || isSubmitting) {
      return;
    }

    this.setState({ isSubmitting: true });

    const { history } = this.props;

    this.auth
      .login(passcode)
      .then(() => {
        const { href } = window.location;
        const redirectTo = nextPathFromHref(href);
        this.setState({ isSubmitting: false });
        return history.replace(redirectTo);
      })
      .catch(error => {
        let { message } = error;

        if (error.statusCode && error.statusCode === 401) {
          message =
            'Whoops! Passcode is incorrect or has expired.\n\nPlease try again.';
        }
        this.setState({ isSubmitting: false });
        alert(message); // eslint-disable-line
      });
  };

  onChange = e => {
    // Sets the state's passcode attribute to value in <input>. Fires every time key is pressed
    const { value } = e.target;
    const passcode = value.trim();

    this.setState({ passcode });
  };

  onKeyPress = e => {
    // Allows user to submit by pressing enter key
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onSubmit(e);
    }
  };

  render() {
    const { passcode, isSubmitting } = this.state;

    return (
      <div
        className="absolute flex login"
        style={{ top: '-40%', left: '0', right: '0', bottom: '0' }}
      >
        <img
          className="display-none"
          src={LOADING_IMAGE}
          alt="preloading asset"
        />
        <div className="m-auto">
          <LoginInput
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onKeyPress={this.onKeyPress}
            isSubmitting={isSubmitting}
            isSubmitVisible={passcode.trim().length > 0}
          />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  /** Used for redirecting user to Home component */
  history: PropTypes.object,
};

export default Login;
