import React from 'react';
import PropTypes from 'prop-types';
import { ClientError } from '../../../server/errors';

/**
 * Catches render errors for child components and logs accordingly.
 * If error is crticial, error screen is displayed preventing usage of app.
 * Adapted from https://github.com/anacicconi/universal-react-logger
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderError: null,
      renderErrorInfo: null,
    };
  }

  resetRenderError = () => {
    this.setState({
      renderError: null,
      renderErrorInfo: null,
    });
  };

  componentDidCatch(renderError, renderErrorInfo) {
    this.setState({
      renderError,
      renderErrorInfo,
    });

    const message = `Render error - ${renderError} \n ${renderErrorInfo.componentStack}`;

    const error = new ClientError(message);
    error.send();
  }

  render() {
    const { children } = this.props;
    const { renderError, renderErrorInfo } = this.state;

    if (renderError || renderErrorInfo) {
      return (
        <div className="center pt4">
          <h4>
            Oh noo! Something went horribly wrong.
            <div>
              <span aria-label="uh-oh" role="img" className="h1">
                😳
              </span>
            </div>
          </h4>
          <p>
            We&apos;ve been notified, but
            <a href="/" className="bold block underline">
              try refreshing
            </a>
            or
            <a
              href="mailto:dane@pep.cm?subject=Inquiry"
              className="bold block underline"
            >
              send me an email!
            </a>
          </p>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default ErrorBoundary;
