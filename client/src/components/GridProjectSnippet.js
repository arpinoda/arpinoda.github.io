import React from 'react';
import PropTypes from 'prop-types';

/**
 * The animated pane displayed on a project when a user is hovering
 * @param {Boolean} isVisible True if the user is hovering the project
 * @param {Boolean} forceHide Will be true for videos after N seconds of hovering
 * @param {Object} project Used to display project name & description
 */
const GridProjectSnippet = ({ isvisible, forceHide, project }) => {
  const snippetStyle = {
    userSelect: 'none',
    position: 'relative',
    height: 'calc(100% - 20px)',
    transition: 'opacity 0.3s, transform 0.3s',
    transformStyle: 'preserve-3d',
    transformOrigin: 'bottom',
    background:
      'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))',
    transform: isvisible ? 'rotateX(0deg)' : 'rotateX(30deg)',
    opacity: isvisible ? '1' : '0',
  };

  const paragaphStyle = {
    textShadow: '1px 1px 2px rgba(0,0,0,.5)',
    fontFamily: 'system-ui',
    letterSpacing: '0.3px',
  };

  return (
    <>
      <div
        style={{ perspective: '1000px' }}
        className={`absolute bottom-0 left-0 right-0 ${
          forceHide ? 'fadeOut' : 'fadeIn'
        }`}
      >
        <div style={snippetStyle} className="p1">
          <p
            style={{ ...paragaphStyle, ...{ padding: '7px 0 4px 0' } }}
            className="bold white"
          >
            {project.name}
          </p>
          <p style={paragaphStyle} className="line-height-4 white">
            {project.description}
          </p>
        </div>
      </div>
    </>
  );
};

GridProjectSnippet.propTypes = {
  isvisible: PropTypes.bool,
  forceHide: PropTypes.bool,
  project: PropTypes.object,
};

export default GridProjectSnippet;
