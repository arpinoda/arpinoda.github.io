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
const ProjectVideo = ({ className, project, setIsBuffering }) => {
  const [error, setError] = useState(null);
  const [url, setURL] = useState();
  // const [playPromise, setPlayPromise] = useState(null);
  const videoRef = useRef();
  const { thumbnail, video } = project.media;

  useEffect(() => {
    imageCache(thumbnail)
      .then(blobURL => {
        setURL(blobURL);
      })
      .catch(err => setError(err));
  }, [thumbnail]);

  // useEffect(() => {
  //   // if (isPlaying) {

  //   //   videoRef.current.play()
  //   //     .catch(err => alert(err));
  //   // } else {
  //   //   videoRef.current.pause();
  //   //   videoRef.current.currentTime = 0;
  //   // }
  //   // const playPromise = videoRef.current.play();
  //   // if (playPromise !== undefined) {
  //   //   playPromise.then(() => {
  //   //     // Automatic playback started!
  //   //     // Show playing UI.
  //   //     // We can now safely pause video...
  //   //     if (!isPlaying) {
  //   //       videoRef.current.pause();
  //   //       videoRef.current.currentTime = 0;
  //   //     }
  //   //   })
  //   //     .catch(err => {
  //   //       alert(err);
  //   //       setError(err);
  //   //       // Auto-play was prevented
  //   //       // Show paused UI.
  //   //     });
  //   // }

  //   const handlePlay = () => {
  //     if (isPlaying) {
  //       const promise = videoRef.current.play()
  //         .catch(err => {
  //           alert(err);
  //           setError(err);
  //         });
  //       setPlayPromise(promise);
  //     } else if (playPromise && !isPlaying) {
  //       playPromise
  //         .then(() => {
  //           videoRef.current.pause();
  //           videoRef.current.currentTime = 0;
  //         })
  //         .catch(err => {
  //           alert(err);
  //           setError(err);
  //         });
  //     }
  //   };

  //   handlePlay();
  // }, [isPlaying]);

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
        onError={() => {
          setError(true);
        }}
        loop
        poster={error ? BROKEN_IMAGE : url}
        preload="metadata"
        playsInline
        muted
        controls
        src={`${process.env.API_PATH}/video/${video}`}
        style={{ height: '100%' }}
        className={className}
      >
        <source
          src={`${process.env.API_PATH}/video/${video}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <button
        className="absolute top-0 right-0"
        type="button"
        onClick={() => {
          const playPromise = videoRef.current.play();

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                // Automatic playback started!
                // Show playing UI.
                // We can now safely pause video...
              })
              .catch(err => {
                alert(err);
                // Auto-play was prevented
                // Show paused UI.
              });
          }
        }}
      >
        Play
      </button>

      <button
        className="absolute top-0 left-0"
        type="button"
        onClick={() => {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }}
      >
        Stop
      </button>
    </>
  );
};

ProjectVideo.propTypes = {
  project: PropTypes.object,
  className: PropTypes.string,
  setIsBuffering: PropTypes.func,
  // isPlaying: PropTypes.bool,
};

export default ProjectVideo;
