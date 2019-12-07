import React, { useState, useRef } from 'react';
// import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProjectImage from './ProjectImage';
import ProjectVideo from './ProjectVideo';
import GridProjectSnippet from './GridProjectSnippet';
import VideoPlayButton from './VideoPlayButton';

const GridProjectMobile = ({ project, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  let component = null;
  const isVideo = project.media.video !== undefined;

  const videoRef = useRef();

  function togglePlayPause() {
    if (isPlaying) {
      videoRef.current.play().catch(err => alert(err));
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  if (videoRef.current) {
    togglePlayPause();
  }
  // useEffect(() => {
  //   if (videoRef.current) {
  //     togglePlayPause();
  //   }
  // }, [isPlaying]);

  if (isVideo) {
    component = (
      <>
        <ProjectVideo
          className={className}
          project={project}
          isPlaying={isPlaying}
          setIsBuffering={setIsBuffering}
          ref={videoRef}
        />
        {isBuffering && (
          <VideoPlayButton
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}
            isPlaying={isPlaying}
          />
        )}
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
      <GridProjectSnippet isVisible={!isPlaying} project={project} />
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
