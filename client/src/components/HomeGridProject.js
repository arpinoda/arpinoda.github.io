import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ProjectImage from './ProjectImage';
import HomeGridVideo from './HomeGridVideo';
import { LOADING_IMAGE } from '../util/UI';
import HomeGridProjectSnippet from './HomeGridProjectSnippet';

/**
 * Represents one project tile within the HomeGridCategory
 */
class HomeGridProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovering: false,
      isVideoDownloaded: false,
      isDetailMinimized: false,
    };
  }

  onMouseLeave = () => {
    this.handleMouseHover(false);
    setTimeout(() => {
      this.setState({ isDetailMinimized: false });
    }, 500);
  };

  onMouseEnter = () => {
    this.handleMouseHover(true);
  };

  handleMouseHover = val => {
    this.setState({ isHovering: val });
  };

  videoDownloadCallback = () => {
    this.setState({
      isVideoDownloaded: true,
    });
  };

  minimizeDetailCallback = val => {
    this.setState({
      isDetailMinimized: val,
    });
  };

  render = () => {
    const { project, setEventError } = this.props;
    const { isHovering, isDetailMinimized, isVideoDownloaded } = this.state;
    const hasVideo = project.media.video !== undefined;
    const mediaClassName = 'absolute left-0 top-0';
    const { thumbnail } = project.media;

    return (
      <figure
        className={`mr3 mb3 relative overflow-hidden ${
          isHovering ? 'active' : ''
        }`}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <img src={LOADING_IMAGE} alt="loading" className="loading col-12" />

        <NavLink
          to={`/project/${project.projectID}`}
          className="absolute top-0 left-0 bottom-0 right-0 z2"
        />

        {hasVideo ? (
          <HomeGridVideo
            project={project}
            isHovering={isHovering}
            className={mediaClassName}
            setEventError={setEventError}
            isVideoDownloaded={isVideoDownloaded}
            minimizeDetailCallback={this.minimizeDetailCallback}
            downloadCompleteCallback={this.videoDownloadCallback}
          />
        ) : (
          <ProjectImage
            {...this.props}
            alt={project.title}
            src={thumbnail}
            className={mediaClassName}
          />
        )}

        <HomeGridProjectSnippet
          isHovering={isHovering}
          isDetailMinimized={isDetailMinimized}
          project={project}
        />
      </figure>
    );
  };
}

HomeGridProject.propTypes = {
  project: PropTypes.object.isRequired,
  setEventError: PropTypes.func,
};

export default HomeGridProject;
