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
    showProgressBar: true,
    playButton: [
      VideoPlayButton,
      {
        style: {
          right: '',
          width: '80px',
          height: '80px',
          left: 'calc(50% - 40px)',
          top: 'calc(50% - 40px)',
        },
      },
    ],
  };

  const body = isVideo ? (
    <div style={styleToObject(media.css)}>
      <ProjectVideo
        {...props}
        videoURL={media.item}
        thumbnail={media.thumbnail}
        options={videoOptions}
        className="col-12"
      />
    </div>
  ) : (
    <ProjectImage
      {...props}
      alt={media.alt}
      src={media.item}
      style={{ pointerEvents: 'none' }}
      className="relative z2 block"
    >
      {media.video && (
        <div style={styleToObject(media.video.css)} className="absolute">
          <div className="relative">
            <ProjectVideo
              {...props}
              className="col-12"
              videoURL={media.video.item}
              thumbnail={media.video.thumbnail}
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
