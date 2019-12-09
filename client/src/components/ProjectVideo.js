import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Video, { videoStates } from './Video';
import VideoPlayButton from './VideoPlayButton';
import VideoLoading from './VideoLoading';
import useHover from './useHover';

// Wrapper function that displays a custom video player.
// Responsilbility is to read the option object
// and render approriate video component(s)
const ProjectVideo = props => {
  const [videoState, setVideoState] = useState(videoStates.READY);
  const [playFn, setPlayFn] = useState(null);
  const videoRef = useRef();

  const { options } = props;
  let hoverRef;
  let hovered;

  if (options.playOnHover) {
    [hoverRef, hovered] = useHover(false);

    useEffect(() => {
      if (hovered) {
        setVideoState(videoStates.PLAYING);
      } else {
        setVideoState(videoStates.READY);
      }
    }, [hovered]);
  }

  return (
    <div ref={hoverRef} className="waa">
      {/* Main Video Element */}
      <Video
        {...props}
        playFn={playFn}
        ref={videoRef}
        onStateChange={setVideoState}
        currentState={videoState}
      />

      {/* Loading Indicator Element */}
      {videoState === videoStates.LOADING && <VideoLoading />}

      {/* Play Button */}
      {options.playButton && videoState === videoStates.READY && (
        <VideoPlayButton
          onClick={() => {
            setPlayFn(videoRef);
          }}
        />
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
