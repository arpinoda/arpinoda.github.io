import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ImageCache } from './Cache';
import { BROKEN_IMAGE } from '../util/UI';
import { ClientError } from '../../../server/errors';
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
  const {
    className,
    thumbnail,
    onStateChange,
    videoURL,
    currentState,
    onTimeUpdate,
    options,
  } = props;
  const { muted } = options;

  useEffect(() => {
    ImageCache(thumbnail)
      .then(blobURL => {
        setPosterURL(blobURL);
      })
      .catch(err => {
        onStateChange(videoStates.ERROR);
        setPosterURL(BROKEN_IMAGE);
        err = new ClientError(err);
        err.send();
      });
  }, [thumbnail]);

  useEffect(() => {
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
      className={`${className} block`}
      onTimeUpdate={e => {
        if (onTimeUpdate) {
          onTimeUpdate(e.target.currentTime);
        }
      }}
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
      poster={posterURL || ''}
      preload="metadata"
      playsInline
      muted={muted}
      style={{ height: '100%' }}
      src={`${process.env.API_PATH}/video/${videoURL}`}
      type="video/mp4"
    >
      Your browser does not support the video tag.
    </video>
  );
});

Video.propTypes = {
  className: PropTypes.string,
  options: PropTypes.object,
  thumbnail: PropTypes.string,
  videoURL: PropTypes.string,
  currentState: PropTypes.string,
  onStateChange: PropTypes.func,
  onTimeUpdate: PropTypes.func,
};

export default Video;
