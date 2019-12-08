import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ProjectImage from './ProjectImage';
import ProjectVideo from './ProjectVideo';
import GridProjectSnippet from './GridProjectSnippet';
import { videoStates } from './Video';

const GridProjectMobile = ({ project, className }) => {
  const [videoState, setVideoState] = useState(videoStates.READY);

  let component = null;
  const isVideo = project.media.video !== undefined;

  useEffect(() => {
    console.log(`${project.projectID} state: ${videoState}`);
  }, [videoState]);

  if (isVideo) {
    component = (
      <ProjectVideo
        className={className}
        project={project}
        onStateChange={setVideoState}
        currentState={videoState}
        options={null}
      />
    );
  } else {
    component = (
      <ProjectImage
        alt={project.title}
        src={project.media.thumbnail}
        className={className}
      />
    );
  }

  return (
    <div>
      {component}
      <GridProjectSnippet
        isvisible={videoState !== videoStates.PLAYING}
        project={project}
      />
    </div>
  );
};

GridProjectMobile.propTypes = {
  project: PropTypes.object,
  className: PropTypes.string,
};

export default GridProjectMobile;
