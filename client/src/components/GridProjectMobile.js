import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProjectImage from './ProjectImage';
import ProjectVideo from './ProjectVideo';
// import GridProjectSnippet from './GridProjectSnippet';
// import VideoPlayButton from './VideoPlayButton';

const GridProjectMobile = ({ project, className }) => {
  const [isPlaying] = useState(false);

  let component = null;
  const isVideo = project.media.video !== undefined;

  if (isVideo) {
    component = (
      <>
        <ProjectVideo
          className={className}
          project={project}
          isPlaying={isPlaying}
        />
        {/* <VideoPlayButton onClick={setIsPlaying} isPlaying={isPlaying} /> */}
      </>
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
      {/* <GridProjectSnippet isVisible={!isPlaying} project={project} /> */}
      {/* <NavLink
        to={`/project/${project.projectID}`}
        className="absolute top-0 left-0 bottom-0 right-0 z2"
      /> */}
    </div>
  );
};

GridProjectMobile.propTypes = {
  project: PropTypes.object,
  className: PropTypes.string,
};

export default GridProjectMobile;
