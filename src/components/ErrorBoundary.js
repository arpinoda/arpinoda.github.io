import React from 'react';
import PropTypes from 'prop-types';

// Adapted from https://github.com/anacicconi/universal-react-logger
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderError: null,
      renderErrorInfo: null,
    };
    this.resetRenderError = this.resetRenderError.bind(this);
    this.resetEventError = this.resetEventError.bind(this);
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
            type: eventError.type,
            details: eventError.details,
            clientDate: eventError.clientDate,
            stack: eventError.stack,
          },
        };
      }

      // send the errors to the server (production only)
      if (process.env.NODE_ENV === 'development') {
        console.info(body);
      } else {
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
  }

  componentDidCatch(renderError, renderErrorInfo) {
    this.setState({
      renderError,
      renderErrorInfo,
    });
  }

  resetRenderError() {
    this.setState({
      renderError: null,
      renderErrorInfo: null,
    });
  }

  resetEventError() {
    this.props.eventError = null;
  }

  render() {
    const { eventError, children } = this.props;
    const { renderError } = this.state;

    if (renderError || (eventError && eventError.isCritical)) {
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

    // if the component error is not critical keep displaying the children
    return children;
  }
}

ErrorBoundary.propTypes = {
  eventError: PropTypes.object,
  children: PropTypes.node,
};

export default ErrorBoundary;
