import React from 'react';
import { NavLink } from 'react-router-dom';
import ProjectImage from './ProjectImage';
import ProjectVideo from './ProjectVideo';
import VideoTag from './VideoTag';

// Decides whether we're rendering a ProjectImage or ProjectVideo
const GridProjectCommon = props => {
  const { project, videoOptions } = props;
  const { media } = project;
  const isVideo = media.video !== undefined;
  let component = null;

  if (isVideo) {
    component = (
      <>
        <ProjectVideo
          {...props}
          videoURL={media.video}
          thumbnail={media.thumbnail}
          options={videoOptions}
        />
        <VideoTag isVisible={props.isVideoTagVisible} />
      </>
    );
  } else {
    component = (
      <>
        <ProjectImage
          {...props}
          alt={project.title}
          src={project.media.thumbnail}
        />
        <NavLink
          to={`/project/${project.projectID}`}
          className="absolute top-0 right-0 left-0 bottom-0 z1"
        />
      </>
    );
  }

  return component;
};

export default GridProjectCommon;
