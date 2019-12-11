import React from 'react';
import PropTypes from 'prop-types';

const VideoTransparentTarget = props => {
  const { onClick } = props;
  const className = 'absolute top-0 left-0 bottom-0 right-0 z1';

  return (
    <div onMouseUp={onClick} className={className} role="button" tabIndex="0" />
  );
};

VideoTransparentTarget.propTypes = {
  onClick: PropTypes.func,
};

export default VideoTransparentTarget;
