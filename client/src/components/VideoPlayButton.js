import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayButton = ({ onClick, style }) => {
  const svgStyle = {
    ...{
      height: '20%',
      top: '2%',
      right: '2%',
      cursor: 'pointer',
      filter: 'drop-shadow(0px 3px 2px rgba(0,0,0,0.2))',
    },
    ...style,
  };

  const iconStyle = { fill: '#666' };

  const circleStyle = { fill: 'rgba(255, 255, 255, 0.8)' };

  return (
    <svg
      onMouseUp={e => {
        e.preventDefault();
        onClick();
      }}
      style={svgStyle}
      className="absolute z3"
      viewBox="0 0 140 140"
    >
      <circle style={circleStyle} cx="70" cy="70" r="65" />
      <polygon
        id="shape"
        points="50,40 100,70 100,70 50,100, 50,40"
        style={iconStyle}
      />
    </svg>
  );
};

VideoPlayButton.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default VideoPlayButton;
