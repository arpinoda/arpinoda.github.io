import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ImageCache } from './Cache';
import { BROKEN_IMAGE } from '../util/UI';

/**
 * Displays an HTML5 video element
 * @param {String} className Class names applied to the image
 * @param {Object} thumbnail Remote path of image. Will become video's poster image
 * @param {Function} onStateChange Callback triggered whenever video state changes
 * @param {String} videoURL The remote path of the video's content
 * @param {Function} onHover Callback function attached to onHover event
 */

export const videoStates = {
  READY: 'ready',
  LOADING: 'loading',
  PLAYING: 'playing',
  ERROR: 'error', // unsure if needed
};

const Video = React.forwardRef((props, ref) => {
  const [posterURL, setPosterURL] = useState();
  const { className, thumbnail, onStateChange, videoURL, currentState } = props;

  useEffect(() => {
    ImageCache(thumbnail)
      .then(blobURL => {
        setPosterURL(blobURL);
      })
      .catch(err => {
        onStateChange(videoStates.ERROR);
        setPosterURL(BROKEN_IMAGE);
        console.log(err);
      });
  }, [thumbnail]);

  useEffect(() => {
    console.log(`${thumbnail} state: ${currentState}`);

    switch (currentState) {
      case videoStates.ERROR:
        break;
      case videoStates.READY:
        ref.current.pause();
        ref.current.currentTime = 0;
        break;
      case videoStates.PLAYING:
        // Triggering play() occurs within ProjectVideo.js, unfortunately.
        // Was experiencing "NotAllowedError" in Mobile Safari, low power mode.
        // Occured when using a React DOM reference outside context of onClick handler.
        break;
      default:
    }
  }, [currentState]);

  return (
    <video
      ref={ref}
      className={className}
      onEnded={() => {
        onStateChange(videoStates.READY);
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
});

Video.propTypes = {
  className: PropTypes.string,
  thumbnail: PropTypes.string,
  videoURL: PropTypes.string,
  currentState: PropTypes.string,
  onStateChange: PropTypes.func,
};

export default Video;
