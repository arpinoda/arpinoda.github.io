import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ProjectImage from './ProjectImage';
import ProjectVideo from './ProjectVideo';
import GridProjectSnippet from './GridProjectSnippet';
import VideoSpinner from './VideoSpinner';

const GridProjectMobile = ({ project, className }) => {
  let component = null;
  const isVideo = project.media.video !== undefined;

  if (isVideo) {
    component = (
      <>
        <ProjectVideo className={className} project={project} />
        <VideoSpinner />
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
      <GridProjectSnippet isVisible project={project} />
      <NavLink
        to={`/project/${project.projectID}`}
        className="absolute top-0 left-0 bottom-0 right-0 z2"
      />
    </div>
  );
};

GridProjectMobile.propTypes = {
  project: PropTypes.object,
  className: PropTypes.string,
};

export default GridProjectMobile;
