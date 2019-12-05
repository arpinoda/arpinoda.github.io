import React, { useState, useEffect, useRef } from 'react';
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
const ProjectVideo = ({ className, project, setIsBuffering, isPlaying }) => {
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
    const playPromise = videoRef.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // We're playing, and can now safely pause video if necessary
          if (!isPlaying) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [isPlaying]);

  return (
    <>
      <video
        ref={videoRef}
        onPlaying={
          setIsBuffering &&
          (() => {
            setIsBuffering(false);
          })
        }
        onWaiting={
          setIsBuffering &&
          (() => {
            setIsBuffering(true);
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
  setIsBuffering: PropTypes.func,
  isPlaying: PropTypes.bool,
};

export default ProjectVideo;
