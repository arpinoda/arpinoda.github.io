import React from 'react';
import PropTypes from 'prop-types';

const VideoSpinner = ({ isHovering, isBuffering }) => {
  const isAnimating = isBuffering;
  const isVisible = isBuffering || !isHovering;

  const animatingStyle = 'sk-rotateplane 1.2s infinite ease-in-out';

  const gifStyle = {
    WebkitAnimation: isAnimating ? animatingStyle : 'none',
    animation: isAnimating ? animatingStyle : 'none',
    color: !isHovering ? 'inherit' : 'rgba(0,0,0,0)',
  };

  return (
    <div
      style={gifStyle}
      className={`spinner z2 ${isVisible ? 'block' : 'hide'}`}
    />
  );
};

VideoSpinner.propTypes = {
  isHovering: PropTypes.bool,
  isBuffering: PropTypes.bool,
};

export default VideoSpinner;
