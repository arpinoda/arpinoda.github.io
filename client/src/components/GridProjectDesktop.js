import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GridProjectCommon from './GridProjectCommon';
import GridProjectSnippet from './GridProjectSnippet';
import VideoTag from './VideoTag';
import { videoStates } from './Video';

const GridProjectDesktop = props => {
  const [isSnippetVisible, setSnippetVisible] = useState(false);

  const { project } = props;
  let seconds = 0;
  let timer = null;

  useEffect(() => () => clearInterval(timer), [isSnippetVisible]);

  function onTick() {
    seconds += 1;
    if (seconds === 4) {
      setSnippetVisible(false);
    }
  }

  // Start timer which hides snippet after N seconds
  function onVideoStateChange(videoState) {
    if (videoState === videoStates.PLAYING) {
      timer = setInterval(onTick, 1000);
    }
  }

  const desktopVideoOptions = {
    onVideoStateChange,
    playOnHover: true,
  };

  return (
    <div
      onMouseEnter={() => setSnippetVisible(true)}
      onMouseLeave={() => setSnippetVisible(false)}
    >
      <GridProjectCommon {...props} videoOptions={desktopVideoOptions} />
      <GridProjectSnippet isvisible={isSnippetVisible} project={project} />
      <VideoTag isVisible={timer !== null} />
    </div>
  );
};

GridProjectDesktop.propTypes = {
  project: PropTypes.object,
};

export default GridProjectDesktop;
