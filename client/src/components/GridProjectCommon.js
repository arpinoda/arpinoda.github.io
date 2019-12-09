import React from 'react';
import ProjectImage from './ProjectImage';
import ProjectVideo from './ProjectVideo';

// Decides whether we're rendering a ProjectImage or ProjectVideo
const GridProjectCommon = props => {
  const { project, videoOptions } = props;
  const { media } = project;
  const isVideo = media.video !== undefined;
  let component = null;

  if (isVideo) {
    component = (
      <ProjectVideo
        {...props}
        videoURL={media.video}
        thumbnail={media.thumbnail}
        options={videoOptions}
      />
    );
  } else {
    component = (
      <ProjectImage
        {...props}
        alt={project.title}
        src={project.media.thumbnail}
      />
    );
  }

  return component;
};

export default GridProjectCommon;
