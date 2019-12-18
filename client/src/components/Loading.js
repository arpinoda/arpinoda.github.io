import React from 'react';

/**
 * Loading spinners used throughout the application
 */

// Home screen initial data bootstrap
const HourglassSpinner = () => <div className="lds-hourglass" />;

// Project detail clicked
const CircularSpinner = () => (
  <svg
    data-ut="spinner"
    width="35px"
    height="35px"
    viewBox="0 0 200 200"
    preserveAspectRatio="xMinYMin meet"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute z1"
    style={{
      left: 'calc(50% - 17px)',
      top: 'calc(50% - 17px)',
      WebkitAnimation: 'spinConstant 750ms infinite linear',
      animation: 'spinConstant 750ms infinite linear',
    }}
  >
    <defs>
      <linearGradient
        id="spinner-1576676782210"
        x1="0%"
        y1="0%"
        x2="65%"
        y2="0%"
      >
        <stop offset="0%" className="spinner-blue" />
        <stop offset="100%" stopOpacity="0" className="spinner-blue" />
      </linearGradient>
    </defs>
    <circle
      cx="100"
      cy="100"
      r="90"
      fill="transparent"
      stroke="url(#spinner-1576676782210)"
      strokeWidth="20"
    />
  </svg>
);

export { HourglassSpinner, CircularSpinner };
