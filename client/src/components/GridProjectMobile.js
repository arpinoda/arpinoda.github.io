import React from 'react';
import PropTypes from 'prop-types';

import GridProjectCommon from './GridProjectCommon';
import GridProjectSnippet from './GridProjectSnippet';
// import { videoStates } from './Video';

const GridProjectMobile = props => {
  const { project } = props;
  const mobileVideoOptions = {
    playButton: true,
  };

  return (
    <>
      <GridProjectCommon {...props} videoOptions={mobileVideoOptions} />
      <GridProjectSnippet
        isvisible
        /* {
          videoState !== videoStates.PLAYING &&
          videoState !== videoStates.LOADING
        } */
        project={project}
      />
    </>
  );
};

GridProjectMobile.propTypes = {
  project: PropTypes.object,
};

export default GridProjectMobile;
