import React from 'react';
import ErrorBoundary from './ErrorBoundary';

// Adapted via https://github.com/anacicconi/universal-react-logger
function withErrorHandler(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        eventError: null,
      };
      this.setEventError = this.setEventError.bind(this);
    }

    setEventError(eventError) {
      this.setState({
        eventError,
      });
    }

    render() {
      const { eventError } = this.state;

      if (eventError) {
        return (
          <ErrorBoundary eventError={eventError}>
            <WrappedComponent
              setEventError={this.setEventError}
              {...this.props}
            />
          </ErrorBoundary>
        );
      }

      return (
        <ErrorBoundary>
          <WrappedComponent
            setEventError={this.setEventError}
            {...this.props}
          />
        </ErrorBoundary>
      );
    }
  };
}

export default withErrorHandler;
