import React from 'react';
import ErrorBoundary from './ErrorBoundary';

/**
 * Wraps a component within an ErrorBoundary and exposes a function for catching & logging
 * event-based errors.
 * Adapted via https://github.com/anacicconi/universal-react-logger
 * @param {Object} WrappedComponent A React component to inherit render and event error handling
 */
const withErrorHandler = WrappedComponent => {
  class Outer extends React.Component {
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
  }

  return Outer;
};

export default withErrorHandler;
