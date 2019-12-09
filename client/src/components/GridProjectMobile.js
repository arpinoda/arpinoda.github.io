import React, { useState } from 'react';
import PropTypes from 'prop-types';

import GridProjectCommon from './GridProjectCommon';
import GridProjectSnippet from './GridProjectSnippet';
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

  const mobileVideoOptions = {
    onVideoStateChange,
    playButton: true,
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
