import React from 'react';
import PropTypes from 'prop-types';
import AUTH from '../util/AUTH';
import withErrorHandler from './withErrorHandler';
import { LOADING_IMAGE } from '../util/UI';
import arrowRight from '../static/images/public/right-arrow.svg';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passcode: '',
    };

    this.auth = new AUTH();
  }

  componentDidMount() {
    if (this.auth.loggedIn()) {
      const { history } = this.props;
      history.replace('/');
    }
  }

  onInputChange = e => {
    const { target } = e;
    this.setState({
      passcode: target.value,
    });
  };

  handleFormSubmit = e => {
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
        let redirectTo = '/';

        if (href.indexOf('next=') > 0) {
          redirectTo = href.substring(href.indexOf('next=') + 5);
        }

        return history.replace(redirectTo);
      })
      .catch(error => {
        let { message } = error;

        if (message === 'Unauthorized') {
          message = 'Whoops, incorrect passcode! Please try again.';
        }

        alert(message); // eslint-disable-line
      });
  };

  onChange = e => {
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
                src={arrowRight}
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
  history: PropTypes.object,
};

export default withErrorHandler(Login, false);
