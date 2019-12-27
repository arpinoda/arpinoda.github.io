import React from 'react';
import ErrorBoundary from './ErrorBoundary';

/**
 * Wraps a component within an ErrorBoundary
 * @param {Object} WrappedComponent A React component to inherit render and event error handling
 */
const withErrorHandler = WrappedComponent => {
  const ErrorOuter = props => (
    <ErrorBoundary>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  return ErrorOuter;
};

export default withErrorHandler;
