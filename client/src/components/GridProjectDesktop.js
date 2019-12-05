import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import useHover from './useHover';
import ProjectImage from './ProjectImage';
import ProjectVideo from './ProjectVideo';
import GridProjectSnippet from './GridProjectSnippet';
import VideoSpinner from './VideoSpinner';

const GridProjectDesktop = ({ project, className }) => {
  const [hoverRef, hovered] = useHover();
  const [videoDownloaded, setVideoDownloaded] = useState(false);
  const [forceHide, setForceHide] = useState(false);

  let component = null;

  const isVideo = project.media.video !== undefined;
  const HIDE_VIDEO_SNIPPET_SECONDS = 4;

  useEffect(() => {
    if (hovered && isVideo) {
      let value = 0;
      const interval = setInterval(() => {
        value += 1;

        if (value === HIDE_VIDEO_SNIPPET_SECONDS) {
          setForceHide(true);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
    return () => setForceHide(false);
  }, [hovered]);

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
    <div ref={hoverRef}>
      {component}
      <GridProjectSnippet
        isVisible={hovered}
        forceHide={forceHide}
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
