import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BROKEN_IMAGE } from '../util/UI';

/**
 * Displays a project's image retrieved via API endpoint or cache
 * @param {String} alt Alternative text displayed for the image
 * @param {String} className Class names applied to the image
 * @param {String} src The url path of the image
 * @param {Function} onError Called if the image fails to load
 */
const ProjectImage = ({ alt, className, src }) => {
  const [hasError, setError] = useState(false);

  return (
    <img
      src={hasError ? BROKEN_IMAGE : src}
      style={{ height: '100%' }}
      alt={alt}
      onError={() => setError(true)}
      className={`col-12 ${className}`}
    />
  );
};

ProjectImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default ProjectImage;
