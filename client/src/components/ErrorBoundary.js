import React from 'react';
import PropTypes from 'prop-types';

// Adapted from https://github.com/anacicconi/universal-react-logger
/**
 * Catches render & event errors for child components and logs accordingly.
 * If error is crticial, show error screen preventing user from using app.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderError: null,
      renderErrorInfo: null,
    };
  }

  componentDidUpdate() {
    const { eventError } = this.props;
    const { renderError, renderErrorInfo } = this.state;

    if (eventError || renderError) {
      let body = {};

      if (renderError) {
        body = {
          error: {
            message: renderError.toString(),
            stack: renderErrorInfo.componentStack,
          },
        };
      }

      if (eventError) {
        body = {
          error: {
            message: eventError.message,
            stack: eventError.stack,
          },
        };
      }

      // Send the errors to the server
      fetch('/log-client-errors', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    }
  }

  resetRenderError = () => {
    this.setState({
      renderError: null,
      renderErrorInfo: null,
    });
  };

  resetEventError = () => {
    this.props.eventError = null;
  };

  componentDidCatch(renderError, renderErrorInfo) {
    this.setState({
      renderError,
      renderErrorInfo,
    });
  }

  render() {
    const { eventError, children } = this.props;
    const { renderError } = this.state;

    // If the error is critical, show error page
    if (renderError || (eventError && eventError.showErrorPage)) {
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

    // If the error is NOT critical, display children
    return children;
  }
}

ErrorBoundary.propTypes = {
  eventError: PropTypes.object,
  children: PropTypes.node,
};

export default ErrorBoundary;
