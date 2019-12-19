import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import Video, { videoStates } from './Video';
import VideoLoading from './VideoLoading';
import VideoControlsWrapper from './VideoControlsWrapper';
import VideoTransparentTarget from './VideoTransparentTarget';
import VideoProgressBar from './VideoProgressBar';
import useHover from './useHover';

// Wrapper function that displays a custom video player.
// Responsilble for reading the option object and rendering approriate video component(s)
const ProjectVideo = props => {
  const [videoState, setVideoState] = useState(videoStates.READY);
  const [currentTime, setCurrentTime] = useState(0);
  const [hoverRef, hovered] = useHover();
  const videoRef = useRef();
  let { options } = props;
  const DELAY_HOVER_PLAY_MS = 600;

  const defaults = {
    muted: true,
    playOnHover: false,
    playButton: null,
    showProgressBar: false,
    onVideoStateChange: null,
    duringReadyComponent: null,
    duringPlayComponent: null,
    duringLoadComponent: null,
    duringErrorComponent: null,
  };

  options = Object.assign({}, defaults, options);

  // Trigger the parent component callback function
  useEffect(() => {
    if (options.onVideoStateChange) {
      options.onVideoStateChange(videoState);
    }
  }, [videoState]);

  // Has to be called in same scope as our play button's onclick handler
  // to resolve NotAllowedError seen in low-power mode on mobile Safari.
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

  const playVideoWithDelay = debounce(playVideo, DELAY_HOVER_PLAY_MS);

  function seekVideoTo(time) {
    videoRef.current.currentTime = time;
  }

  // Play on hover
  useEffect(() => {
    if (options.playOnHover) {
      if (videoState === videoStates.READY && hovered) {
        playVideoWithDelay();
      } else if (!hovered && videoState === videoStates.PLAYING) {
        setVideoState(videoStates.READY);
      }
    }

    return () => {
      playVideoWithDelay.clear();
    };
  }, [hovered]);

  return (
    <>
      {/* Main Video Element */}
      <Video
        {...props}
        options={options}
        ref={videoRef}
        onStateChange={setVideoState}
        currentState={videoState}
        onTimeUpdate={time => {
          setCurrentTime(time);
        }}
      />

      {/* Components displayed above video for each state. A default transparent target is
      rendered for capturing gesture and mouse events if an overriding option is not provided */}
      <VideoControlsWrapper
        options={options}
        ref={options.playOnHover ? hoverRef : null}
        videoState={videoState}
        playVideo={playVideo}
        onDuringPlaying={
          // Essentially stop/reset button
          options.duringPlayComponent || [
            VideoTransparentTarget,
            { onClick: () => setVideoState(videoStates.READY) },
          ]
        }
        onDuringReady={
          // Play button or event triggering play
          options.duringReadyComponent || [
            VideoTransparentTarget,
            { onClick: () => playVideo() },
          ]
        }
        onDuringLoading={
          // If user interacts with loading screen
          options.duringLoadComponent || [
            VideoTransparentTarget,
            { onClick: () => setVideoState(videoStates.READY) },
          ]
        }
        onDuringError={
          // Displayed when video has errored
          options.duringErrorComponent || [
            VideoTransparentTarget,
            { onClick: () => setVideoState(videoStates.READY) },
          ]
        }
      />

      {/* Loading Indicator Element */}
      {videoState === videoStates.LOADING && <VideoLoading />}

      {/* Video progress bar, if enabled */}
      {options.showProgressBar && (
        <VideoProgressBar
          totalDuration={videoRef.current && videoRef.current.duration}
          currentTime={currentTime}
          seekVideoTo={seekVideoTo}
        />
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
  onStateChange: PropTypes.func,
};

export default ProjectVideo;
