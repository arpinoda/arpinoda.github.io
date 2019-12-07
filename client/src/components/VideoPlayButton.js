import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const VideoPlayButton = ({ onClick }) => {
  const startRef = useRef();
  const stopRef = useRef();

  const svgStyle = {
    height: '20%',
    top: '2%',
    right: '2%',
    position: 'absolute',
    cursor: 'pointer',
    filter: 'drop-shadow(0px 3px 2px rgba(0,0,0,0.2))',
  };

  const iconStyle = {
    fill: '#666',
  };

  const circleStyle = {
    fill: 'rgba(255, 255, 255, 0.8)',
  };

  // const onSVGClick = () => {
  //   // Play or stop the video

  //   if (isPlaying) {
  //     stopRef.current.endElement();
  //     startRef.current.beginElement();
  //   } else {
  //     startRef.current.endElement();
  //     stopRef.current.beginElement();
  //   }
  // };

  return (
    <svg
      onClick={onClick}
      style={svgStyle}
      className="absolute z3"
      viewBox="0 0 140 140"
    >
      <circle style={circleStyle} cx="70" cy="70" r="65" />
      <polygon
        id="shape"
        points="50,40 100,70 100,70 50,100, 50,40"
        style={iconStyle}
      >
        <animate
          ref={stopRef}
          begin="indefinite"
          fill="freeze"
          attributeName="points"
          dur="500ms"
          to="45,45 95,45 95,95, 45,95 45,45"
          keySplines="
            0.1 0.8 0.2 1;
            0.1 0.8 0.2 1;
            0.1 0.8 0.2 1;
            0.1 0.8 0.2 1;
            0.1 0.8 0.2 1;
            0.1 0.8 0.2 1"
          keyTimes="0;0.22;0.33;0.55;0.66;0.88;1"
          calcMode="spline"
        />
        <animate
          ref={startRef}
          begin="indefinite"
          fill="freeze"
          attributeName="points"
          dur="500ms"
          to="50,40 100,70 100,70 50,100, 50,40"
          keySplines="
            0.1 0.8 0.2 1;
            0.1 0.8 0.2 1;
            0.1 0.8 0.2 1;
            0.1 0.8 0.2 1;
            0.1 0.8 0.2 1;
            0.1 0.8 0.2 1"
          keyTimes="0;0.22;0.33;0.55;0.66;0.88;1"
          calcMode="spline"
        />
      </polygon>
    </svg>
  );
};

VideoPlayButton.propTypes = {
  onClick: PropTypes.func,
};

export default VideoPlayButton;
