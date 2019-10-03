import React from 'react';
import PropTypes from 'prop-types';
import AUTH from '../util/AUTH';

class Login extends React.Component {
  Auth = new AUTH();

  constructor(props) {
    super(props);

    this.state = {
      passcode: '',
    };
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
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
    const { history } = this.props;

    this.Auth.login(passcode)
      .then(res => {
        if (!res.success) {
          return alert("Sorry those credentials don't exist!");
        }

        return history.replace('/');
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    return (
      <div>
        <input
          placeholder="Enter your passcode"
          name="passcode"
          type="text"
          onChange={this.onInputChange}
        />
        <button type="button" onClick={this.handleFormSubmit}>
          Login
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
