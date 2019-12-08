import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import imageCache from './ImageCache';
import { BROKEN_IMAGE } from '../util/UI';

/**
 * Displays an HTML5 video element
 * @param {String} className Class names applied to the image
 * @param {Object} thumbnail Remote path of image. Will become video's poster image
 * @param {Function} onStateChange Callback triggered whenever video state changes
 * @param {String} videoURL The remote path of the video's content
 */

export const videoStates = {
  READY: 'ready',
  LOADING: 'loading',
  PLAYING: 'playing',
  ERROR: 'error',
};

const Video = props => {
  const { className, thumbnail, onStateChange, videoURL, currentState } = props;
  const [posterURL, setPosterURL] = useState();
  const videoRef = useRef();

  useEffect(() => {
    if (currentState === videoStates.ERROR) {
      setPosterURL(BROKEN_IMAGE);
    } else {
      imageCache(thumbnail)
        .then(blobURL => {
          setPosterURL(blobURL);
        })
        .catch(err => {
          onStateChange(videoStates.ERROR);
          console.log(err);
        });
    }
    if (currentState === videoStates.PLAYING) {
      videoRef.current.play().catch(err => {
        alert(err);
        onStateChange(videoStates.ERROR);
      });
    }
  }, [currentState]);

  return (
    <video
      ref={videoRef}
      className={className}
      onCanPlay={() => {
        onStateChange(videoStates.READY);
      }}
      onEnded={() => {
        onStateChange(videoStates.READY);
        videoRef.current.currentTime = 0;
      }}
      onError={() => {
        onStateChange(videoStates.ERROR);
      }}
      onPlaying={() => {
        onStateChange(videoStates.PLAYING);
      }}
      onWaiting={() => {
        onStateChange(videoStates.LOADING);
      }}
      poster={posterURL}
      preload="metadata"
      playsInline
      muted
      style={{ height: '100%' }}
    >
      <source
        src={`${process.env.API_PATH}/video/${videoURL}`}
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
};

Video.propTypes = {
  className: PropTypes.string,
  thumbnail: PropTypes.string,
  videoURL: PropTypes.string,
  currentState: PropTypes.string,
  onStateChange: PropTypes.func,
};

export default Video;
