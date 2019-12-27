import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BROKEN_IMAGE, LOADING_IMAGE } from '../util/UI';
import { ImageCache } from './Cache';
import { ClientError } from '../../../server/errors';

/**
 * Displays a project's image retrieved via API endpoint or cache
 * @param {String} alt Alternative text displayed for the image
 * @param {String} className Class names applied to the image
 * @param {String} src The url path of the image
 */
const ProjectImage = ({ children, alt, className, src, style }) => {
  const [error, setError] = useState(null);
  const [url, setURL] = useState();

  useEffect(() => {
    ImageCache(src)
      .then(blobURL => {
        setURL(blobURL);
      })
      .catch(err => {
        err = new ClientError(err);
        err.send();
        setError(err);
      });
  }, [src]);

  const imgStyle = {
    WebkitAnimation: 'fadeIn .7s',
    animation: 'fadeIn .7s',
    MozAnimation: 'fadeIn .7s',
    height: '100%',
  };

  return (
    <>
      <img
        src={error ? BROKEN_IMAGE : url ? url : LOADING_IMAGE} //eslint-disable-line
        style={url ? { ...style, ...imgStyle } : { ...style }} // fade-in images once 'url' is set
        alt={alt}
        onError={() => setError(true)}
        className={`col-12 ${className}`}
      />
      {children}
    </>
  );
};

ProjectImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default ProjectImage;
