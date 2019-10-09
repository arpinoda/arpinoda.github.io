import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import HomeGridImage from './HomeGridImage';
import HomeGridVideo from './HomeGridVideo';
import { LOADING_IMAGE } from '../util/UI';

class HomeGridFigure extends React.Component {
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
    const { project } = this.props;
    const { isHovering, isVideoDownloaded, isDetailMinimized } = this.state;
    const hasVideo = project.images.video !== undefined;

    const gifStyle = {
      WebkitAnimation:
        isHovering && !isVideoDownloaded
          ? 'sk-rotateplane 1.2s infinite ease-in-out'
          : 'none',
      animation:
        isHovering && !isVideoDownloaded
          ? 'sk-rotateplane 1.2s infinite ease-in-out'
          : 'none',
      color: !isHovering ? 'inherit' : 'rgba(0,0,0,0)',
      display: hasVideo ? 'block' : 'none',
    };

    return (
      <figure
        className={`mr3 mb3 relative overflow-hidden
          ${isHovering ? 'active' : ''}`}
        onMouseEnter={() => {
          this.onMouseEnter();
        }}
        onMouseLeave={() => {
          this.onMouseLeave();
        }}
        onFocus={() => null}
      >
        <img src={LOADING_IMAGE} alt="loading" className="loading" />
        {hasVideo ? (
          <HomeGridVideo
            project={project}
            isHovering={isHovering}
            minimizeDetailCallback={this.minimizeDetailCallback}
            downloadComplete={this.videoDownloadCallback}
          />
        ) : (
          <HomeGridImage project={project} />
        )}

        <div className={isDetailMinimized ? 'hide' : 'block'}>
          <div className="p1">
            <p className="bold">{project.name}</p>
            <p className="line-height-4">{project.description}</p>
          </div>
        </div>
        <NavLink
          to={`/project/${project.projectID}`}
          className="absolute top-0 left-0 bottom-0 right-0"
        />
        <div
          style={gifStyle}
          className={`
            spinner
            ${isHovering && isVideoDownloaded ? 'hide' : 'block'}
          `}
        />
      </figure>
    );
  };
}

HomeGridFigure.propTypes = {
  project: PropTypes.object.isRequired,
};

export default HomeGridFigure;
