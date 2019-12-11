import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import GridProjectCommon from './GridProjectCommon';
import GridProjectSnippet from './GridProjectSnippet';
import VideoPlayButton from './VideoPlayButton';
import { videoStates } from './Video';

const GridProjectMobile = props => {
  const [isSnippetVisible, setSnippetVisible] = useState(true);
  const { project } = props;

  // Sets snippet visibilty. Hidden when playing and loading
  function onVideoStateChange(videoState) {
    const result =
      videoState === videoStates.PLAYING || videoState === videoStates.LOADING;

    setSnippetVisible(!result);
  }

  const fillParentClassName = 'absolute top-0 left-0 bottom-0 right-0 z1';
  const navLinkURL = `/project/${project.projectID}`;

  const mobileVideoOptions = {
    onVideoStateChange,
    playButton: [VideoPlayButton, {}],
    duringReadyComponent: [
      NavLink,
      { to: navLinkURL, className: fillParentClassName },
    ],
  };

  return (
    <>
      <GridProjectCommon {...props} videoOptions={mobileVideoOptions} />
      <GridProjectSnippet isvisible={isSnippetVisible} project={project} />
    </>
  );
};

GridProjectMobile.propTypes = {
  project: PropTypes.object,
};

export default GridProjectMobile;
