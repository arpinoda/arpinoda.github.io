import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Video, { videoStates } from './Video';
import VideoPlayButton from './VideoPlayButton';
import VideoLoading from './VideoLoading';

// Wrapper function that displays a custom video player.
// Responsilbility is to read the option object
// and render approriate video component(s)
const ProjectVideo = props => {
  const [videoState, setVideoState] = useState(videoStates.READY);
  const videoRef = useRef();
  const { options } = props;

  // Parent component's callback function triggered
  useEffect(() => {
    if (options.onVideoStateChange) {
      options.onVideoStateChange(videoState);
    }
  }, [videoState]);

  let hoverRef;

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
    <div ref={hoverRef} className="waa">
      {/* Main Video Element */}
      <Video
        {...props}
        ref={videoRef}
        onStateChange={setVideoState}
        currentState={videoState}
      />

      {/* Loading Indicator Element */}
      {videoState === videoStates.LOADING && <VideoLoading />}

      {/* Play Button */}
      {options.playButton && videoState === videoStates.READY && (
        <VideoPlayButton onClick={playVideo} />
      )}
    </div>
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
