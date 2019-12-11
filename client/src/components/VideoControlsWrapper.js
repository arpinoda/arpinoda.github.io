import React from 'react';
import PropTypes from 'prop-types';

import { videoStates } from './Video';

// Renders a transparent element above the video, unique to each video state
// Adds click & hover functionality if required
const VideoControlsWrapper = React.forwardRef((props, ref) => {
  const {
    videoState,
    onDuringPlaying,
    onDuringReady,
    onDuringLoading,
    onDuringError,
    options,
    playVideo,
  } = props;

  let [Component, componentProps] = [null, null];

  switch (videoState) {
    case videoStates.READY: {
      [Component, componentProps] = onDuringReady;

      const { playButton } = options || null;

      if (playButton) {
        const [PlayComponent, playProps] = playButton;

        return (
          <>
            <Component {...componentProps} />
            <PlayComponent {...playProps} onClick={playVideo} />
          </>
        );
      }
      break;
    }
    case videoStates.PLAYING:
      [Component, componentProps] = onDuringPlaying;
      break;
    case videoStates.LOADING:
      [Component, componentProps] = onDuringLoading;
      break;
    case videoStates.ERROR:
      [Component, componentProps] = onDuringError;
      break;
    default:
  }

  if (options.playOnHover) {
    componentProps.ref = ref;
  }

  return <Component {...componentProps} />;
});

VideoControlsWrapper.propTypes = {
  videoState: PropTypes.string,
  onDuringPlaying: PropTypes.array,
  onDuringReady: PropTypes.array,
  onDuringLoading: PropTypes.array,
  onDuringError: PropTypes.array,
  options: PropTypes.object,
  playVideo: PropTypes.func,
};

export default VideoControlsWrapper;
