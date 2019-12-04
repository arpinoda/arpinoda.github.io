import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BROKEN_IMAGE, LOADING_IMAGE } from '../util/UI';
import imageCache from './ImageCache';

/**
 * Displays a project's video
 * @param {String} alt Alternative text displayed for the image
 * @param {String} className Class names applied to the image
 * @param {String} src The url path of the image
 */
const ProjectVideo = ({ alt, className, src }) => {
  const [error, setError] = useState(null);
  const [url, setURL] = useState();

  useEffect(() => {
    imageCache(src)
      .then(blobURL => {
        setURL(blobURL);
      })
      .catch(err => setError(err));
  }, [src]);

  return (
    <img
      src={error ? BROKEN_IMAGE : url ? url : LOADING_IMAGE} //eslint-disable-line
      style={{ height: '100%' }}
      alt={alt}
      onError={() => setError(true)}
      className={`col-12 ${className}`}
    />
  );
};

ProjectVideo.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default ProjectVideo;
