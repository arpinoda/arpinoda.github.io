import React from 'react';
import PropTypes from 'prop-types';
import { getFileExtension } from '../util/UI';
import ProjectDetailImage from './ProjectDetailImage';
import ProjectDetailVideo from './ProjectDetailVideo';

const ProjectDetailSection = props => {
  const { media } = props;
  const isVideo = getFileExtension(media.item) === 'mp4';

  const body = !isVideo ? (
    <ProjectDetailImage media={media} />
  ) : (
    <ProjectDetailVideo media={media} />
  );

  return <section>{body}</section>;
};

ProjectDetailSection.propTypes = {
  media: PropTypes.object,
};

export default ProjectDetailSection;
