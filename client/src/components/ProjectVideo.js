import React from 'react';
import PropTypes from 'prop-types';
import Video, { videoStates } from './Video';
import VideoPlayButton from './VideoPlayButton';

const ProjectVideo = props => {
  const { project, /* options, */ onStateChange } = props;
  const { thumbnail, video } = project.media;

  return (
    <>
      <Video {...props} videoURL={video} thumbnail={thumbnail} />
      <VideoPlayButton
        onClick={() => {
          onStateChange(videoStates.PLAYING);
        }}
      />
    </>
  );
};

ProjectVideo.propTypes = {
  project: PropTypes.object,
  options: PropTypes.object,
  onStateChange: PropTypes.func,
};

export default ProjectVideo;
