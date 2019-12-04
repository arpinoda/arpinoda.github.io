import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import useHover from './useHover';
import ProjectImage from './ProjectImage';
import ProjectVideo from './ProjectVideo';
import GridProjectSnippet from './GridProjectSnippet';
import VideoSpinner from './VideoSpinner';

const GridProjectDesktop = ({ project, className }) => {
  const [ref, hovered] = useHover();
  const [videoDownloaded, setVideoDownloaded] = useState(false);

  const isVideo = project.media.video !== undefined;

  let component = null;

  if (isVideo) {
    component = (
      <>
        <ProjectVideo
          className={className}
          project={project}
          onLoadedData={setVideoDownloaded}
          isPlaying={hovered}
        />
        <VideoSpinner
          isHovering={hovered}
          isVideoDownloaded={videoDownloaded}
        />
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
    <div ref={ref}>
      {component}
      <GridProjectSnippet
        isVisible={hovered}
        forceHide={false}
        project={project}
      />
      <NavLink
        to={`/project/${project.projectID}`}
        className="absolute top-0 left-0 bottom-0 right-0 z2"
      />
    </div>
  );
};

GridProjectDesktop.propTypes = {
  project: PropTypes.object,
  className: PropTypes.string,
};

export default GridProjectDesktop;
