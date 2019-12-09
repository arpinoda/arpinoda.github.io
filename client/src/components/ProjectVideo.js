import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Video, { videoStates } from './Video';
import VideoPlayButton from './VideoPlayButton';
import VideoLoading from './VideoLoading';
import VideoInputHandler from './VideoInputHandler';

// Wrapper function that displays a custom video player.
// Responsilbility is to read the option object
// and render approriate video component(s)
const ProjectVideo = props => {
  const [videoState, setVideoState] = useState(videoStates.READY);
  const videoRef = useRef();
  const { options, project } = props;
  const fullScreenClass = 'absolute top-0 left-0 bottom-0 right-0 z1';

  // Parent component's callback function triggered
  useEffect(() => {
    if (options.onVideoStateChange) {
      options.onVideoStateChange(videoState);
    }
  }, [videoState]);

  function playVideo() {
    const promise = videoRef.current.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          // Play started
        })
        .catch(err => {
          alert(err);
          setVideoState(videoStates.ERROR);
        });
    }
  }

  return (
    <>
      {/* Main Video Element */}
      <Video
        {...props}
        ref={videoRef}
        onStateChange={setVideoState}
        currentState={videoState}
      />

      {/* Transparent "Target" for capturing touches and clicks */}
      <VideoInputHandler
        videoState={videoState}
        onDuringPlaying={() => (
          // Stop video from playing
          <div
            onMouseLeave={() => {
              if (options.playOnHover) {
                setVideoState(videoStates.READY);
              }
            }}
            className={fullScreenClass}
            role="button"
            tabIndex="0"
            onMouseUp={() => {
              setVideoState(videoStates.READY);
            }}
          />
        )}
        onDuringError={() => (
          <div
            className={fullScreenClass}
            role="button"
            tabIndex="0"
            onMouseUp={() => {
              setVideoState(videoStates.READY);
            }}
          />
        )}
        onDuringLoading={() => (
          <div
            onMouseLeave={() => {
              setVideoState(videoStates.READY);
            }}
            className={fullScreenClass}
            role="button"
            tabIndex="0"
            onMouseUp={() => {
              setVideoState(videoStates.READY);
            }}
          />
        )}
        onDuringReady={() => (
          <NavLink
            to={`/project/${project.projectID}`}
            className={fullScreenClass}
            onMouseEnter={() => {
              if (options.playOnHover) {
                playVideo();
              }
            }}
            onFocus={() => {}}
          />
        )}
      />

      {/* Loading Indicator Element */}
      {videoState === videoStates.LOADING && <VideoLoading />}

      {/* Play Button */}
      {options.playButton && videoState === videoStates.READY && (
        <VideoPlayButton onClick={playVideo} />
      )}
    </>
  );
};

ProjectVideo.defaultProps = {
  options: {},
};

ProjectVideo.propTypes = {
  currentState: PropTypes.string,
  options: PropTypes.object,
  project: PropTypes.object,
  onStateChange: PropTypes.func,
};

export default ProjectVideo;
