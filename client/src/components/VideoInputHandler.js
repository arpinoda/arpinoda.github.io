import { videoStates } from './Video';

const VideoInputHandler = props => {
  const {
    videoState,
    onDuringPlaying,
    onDuringReady,
    onDuringLoading,
    onDuringError,
  } = props;
  let component = null;

  switch (videoState) {
    case videoStates.READY:
      component = onDuringReady;
      break;
    case videoStates.PLAYING:
      component = onDuringPlaying;
      break;
    case videoStates.LOADING:
      component = onDuringLoading;
      break;
    case videoStates.ERROR:
      component = onDuringError;
      break;
    default:
      component = () => {};
  }

  return component();
};

export default VideoInputHandler;
