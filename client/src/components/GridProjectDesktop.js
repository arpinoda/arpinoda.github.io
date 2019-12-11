import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import GridProjectCommon from './GridProjectCommon';
import GridProjectSnippet from './GridProjectSnippet';
import { videoStates } from './Video';

const GridProjectDesktop = props => {
  const [isSnippetVisible, setSnippetVisible] = useState(false);
  const [isVideoTagVisible, setVideoTagVisible] = useState(true);

  const { project } = props;
  const navLinkURL = `/project/${project.projectID}`;
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

  function onMouseEnter() {
    setSnippetVisible(true);
    setVideoTagVisible(false);
  }

  function onMouseLeave() {
    setSnippetVisible(false);
    setVideoTagVisible(true);
  }

  const fillParentClassName = 'absolute top-0 left-0 bottom-0 right-0 z1';

  const desktopVideoOptions = {
    onVideoStateChange,
    playOnHover: true,
    playButton: null,
    duringReadyComponent: [
      NavLink,
      { to: navLinkURL, className: fillParentClassName },
    ],
    duringPlayComponent: [
      NavLink,
      { to: navLinkURL, className: fillParentClassName },
    ],
  };

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <GridProjectCommon
        {...props}
        isVideoTagVisible={isVideoTagVisible}
        videoOptions={desktopVideoOptions}
      />
      <GridProjectSnippet isvisible={isSnippetVisible} project={project} />
    </div>
  );
};

GridProjectDesktop.propTypes = {
  project: PropTypes.object,
  fullScreenClass: PropTypes.string,
};

export default GridProjectDesktop;
