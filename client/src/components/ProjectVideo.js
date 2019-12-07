import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BROKEN_IMAGE } from '../util/UI';
import imageCache from './ImageCache';

/**
 * Displays a project's video
 * @param {String} className Class names applied to the image
 * @param {Object} project For accessing media attributes
 * @param {Function} setIsBuffering Callback for setting parent state, if provided
 * @param {Boolean} isPlaying Is the video playing or stopped
 */
const ProjectVideo = React.forwardRef((props, ref) => {
  const [error, setError] = useState(null);
  const [url, setURL] = useState();
  const { thumbnail, video } = props.project.media;

  useEffect(() => {
    imageCache(thumbnail)
      .then(blobURL => {
        setURL(blobURL);
      })
      .catch(err => setError(err));
  }, [thumbnail]);

  return (
    <>
      <video
        ref={ref}
        onPlaying={
          props.setIsBuffering &&
          (() => {
            props.setIsBuffering(false);
            return true;
          })
        }
        onWaiting={
          props.setIsBuffering &&
          (() => {
            props.setIsBuffering(true);
            return true;
          })
        }
        onError={() => {
          setError(true);
        }}
        loop
        poster={error ? BROKEN_IMAGE : url}
        preload="metadata"
        playsInline
        muted
        style={{ height: '100%' }}
        className={props.className}
      >
        <source
          src={`${process.env.API_PATH}/video/${video}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </>
  );
});

ProjectVideo.propTypes = {
  project: PropTypes.object,
  className: PropTypes.string,
  setIsBuffering: PropTypes.func,
};

export default ProjectVideo;
