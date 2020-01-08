import React from "react";
import PropTypes from "prop-types";

/**
 * Displays 'MOV' tag for Home Screen videos on non-touch devices.
 * @param {Object} props When props.isVisible controls tag visibility
 */
const VideoTag = props => {
  const { isVisible } = props;
  const style = {
    color: "rgba(0,0,0,0)",
    display: isVisible ? "block" : "none"
  };

  return <div style={style} className="spinner z2" />;
};

VideoTag.propTypes = {
  isVisible: PropTypes.bool
};

VideoTag.defaultProps = {
  isVisible: true
};

export default VideoTag;
