import React from 'react';
import PropTypes from 'prop-types';
import { getFileExtension } from '../util/UI';
import ProjectDetailImage from './ProjectDetailImage';
import ProjectDetailVideo from './ProjectDetailVideo';

const ProjectDetailSection = props => {
  const { media, setEventError } = props;
  const isVideo = getFileExtension(media.item) === 'mp4';

  const body = isVideo ? (
    <ProjectDetailVideo setEventError={setEventError} video={media} />
  ) : (
    <ProjectDetailImage setEventError={setEventError} image={media} />
  );

  return <section className="relative">{body}</section>;
};

ProjectDetailSection.propTypes = {
  media: PropTypes.object,
  setEventError: PropTypes.func,
};

export default ProjectDetailSection;
