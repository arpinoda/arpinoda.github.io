import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BROKEN_IMAGE, LOADING_IMAGE } from '../util/UI';

/**
 * Displays a project's image retrieved via API endpoint or cache
 * @param {String} alt Alternative text displayed for the image
 * @param {String} className Class names applied to the image
 * @param {String} src The url path of the image
 */
const ProjectImage = ({ alt, className, src, imageCache }) => {
  const [hasError, setError] = useState(false);
  const [url, setURL] = useState();

  useEffect(() => {
    imageCache.get(src, setURL, setError);
  }, [url]);

  return (
    <img
      src={hasError ? BROKEN_IMAGE : url ? url : LOADING_IMAGE} //eslint-disable-line
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
  imageCache: PropTypes.object,
};

export default ProjectImage;
