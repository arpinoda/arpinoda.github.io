import React from 'react';
import PropTypes from 'prop-types';
// Displays "MOV" in upper right desktop grid videos
const VideoTag = props => {
  const { isVisible } = props;
  const style = {
    color: 'rgba(0,0,0,0)',
    display: isVisible ? 'block' : 'none',
  };

  return <div style={style} className="spinner z2" />;
};

VideoTag.propTypes = {
  isVisible: PropTypes.bool,
};

export default VideoTag;
