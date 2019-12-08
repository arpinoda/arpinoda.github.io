import React from 'react';

const VideoLoading = () => {
  const svgStyle = {
    height: '25%',
    top: '0%',
    right: '0%',
    width: '11.5%',
    position: 'absolute',
    filter: 'drop-shadow(0px 3px 2px rgba(0,0,0,0.2))',
  };

  return (
    <svg
      version="1.1"
      style={svgStyle}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
      space="preserve"
    >
      <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"
        />
      </circle>
      <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2"
        />
      </circle>
      <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3"
        />
      </circle>
    </svg>
  );
};

export default VideoLoading;
