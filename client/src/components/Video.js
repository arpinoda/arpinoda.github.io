import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import imageCache from './ImageCache';
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
  ERROR: 'error',
};

const Video = React.forwardRef((props, ref) => {
  const [posterURL, setPosterURL] = useState();
  const {
    className,
    thumbnail,
    onStateChange,
    videoURL,
    currentState,
    playFn,
  } = props;

  useEffect(() => {
    console.log(`${thumbnail} state: ${currentState}`);
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
    if (playFn != null) {
      console.log(playFn.current);
      playFn();
      // const promise = ref.current.play();
      // if (promise !== undefined) {
      //   promise.then(() => {
      //     // Play started
      //   }).catch(err => {
      //     alert(err);
      //     onStateChange(videoStates.ERROR);
      //   });
      // }
    }
    if (currentState === videoStates.READY) {
      // alert('pausing')
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  }, [currentState]);

  return (
    <video
      ref={ref}
      className={className}
      onEnded={() => {
        onStateChange(videoStates.READY);
        ref.current.currentTime = 0;
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
  playFn: PropTypes.func,
};

export default Video;
