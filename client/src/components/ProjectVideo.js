import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { BROKEN_IMAGE } from '../util/UI';
import imageCache from './ImageCache';

/**
 * Displays a project's video
 * @param {String} className Class names applied to the image
 * @param {Object} project For accessing media attributes
 * @param {Function} onLoadedData Callback for setting parent state, if provided
 * @param {Boolean} isPlaying Is the video playing or stopped
 */
const ProjectVideo = ({ className, project, onLoadedData, isPlaying }) => {
  const [error, setError] = useState(null);
  const [url, setURL] = useState();
  const videoRef = useRef();
  const { thumbnail, video } = project.media;

  useEffect(() => {
    imageCache(thumbnail)
      .then(blobURL => {
        setURL(blobURL);
      })
      .catch(err => setError(err));
  }, [thumbnail]);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  });

  return (
    <>
      <video
        ref={videoRef}
        onLoadedData={
          onLoadedData &&
          (() => {
            onLoadedData(true);
          })
        }
        onError={setError}
        loop
        poster={error ? BROKEN_IMAGE : url}
        preload="metadata"
        muted
        playsInline
        src={`${process.env.API_PATH}/video/${video}`}
        style={{ height: '100%' }}
        className={className}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
        <track kind="captions" />
      </video>
    </>
  );
};

ProjectVideo.propTypes = {
  project: PropTypes.object,
  className: PropTypes.string,
  onLoadedData: PropTypes.func,
  isPlaying: PropTypes.bool,
};

export default ProjectVideo;
