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

    this.MAX_DETAIL_VISIBLE_SECONDS = 4;
    this.timer = null;
  }

  handleMouseHover = val => {
    this.setState({ isHovering: val });
    if (val) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  };

  videoDownloadCallback = () => {
    this.setState({
      isVideoDownloaded: true,
    });
  };

  startTimer = () => {
    this.detailVisibleSeconds = 0;
    this.timer = setInterval(this.onTick, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ isDetailMinimized: false });
  };

  onTick = () => {
    this.detailVisibleSeconds += 1;

    if (this.detailVisibleSeconds === this.MAX_DETAIL_VISIBLE_SECONDS) {
      this.setState({ isDetailMinimized: true });
      this.detailVisibleSeconds = 0;
    }
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
          this.handleMouseHover(true);
        }}
        onMouseLeave={() => {
          this.handleMouseHover(false);
        }}
        onFocus={() => null}
      >
        <img src={LOADING_IMAGE} alt="loading" className="loading" />
        {hasVideo ? (
          <HomeGridVideo
            project={project}
            isHovering={isHovering}
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
