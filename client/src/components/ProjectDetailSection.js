import React from 'react';
import PropTypes from 'prop-types';
import { getFileExtension, styleToObject } from '../util/UI';
// import ProjectDetailImage from './ProjectDetailImage';
import ProjectImage from './ProjectImage';
import ProjectVideo from './ProjectVideo';
import VideoPlayButton from './VideoPlayButton';

const ProjectDetailSection = props => {
  const { media } = props;
  const isVideo =
    getFileExtension(media.item) === 'mp4' ||
    getFileExtension(media.item) === 'mp4';

  const videoOptions = {
    muted: false,
    playButton: [VideoPlayButton, {}],
  };

  const body = isVideo ? (
    <ProjectVideo
      {...props}
      videoURL={media.item}
      thumbnail={media.thumbnail}
      options={videoOptions}
      className="col-12"
    />
  ) : (
    <ProjectImage
      {...props}
      alt={media.alt}
      src={media.item}
      style={{ pointerEvents: 'none' }}
      className="relative z2"
    >
      {media.video && (
        <div style={styleToObject(media.video.css)} className="absolute">
          <div className="relative">
            <ProjectVideo
              {...props}
              className="col-12"
              videoURL={media.video.item}
              /* thumbnail={media.thumbnail} */
              options={videoOptions}
            />
          </div>
        </div>
      )}
    </ProjectImage>
  );

  return <section className="relative">{body}</section>;
};

ProjectDetailSection.propTypes = {
  media: PropTypes.object,
  setEventError: PropTypes.func,
};

export default ProjectDetailSection;
