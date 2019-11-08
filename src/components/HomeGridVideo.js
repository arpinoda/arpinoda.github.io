import React from 'react';
import PropTypes from 'prop-types';
import API from '../util/API';
import { fetchImage } from '../util/UI';
import brokenImage from '../static/images/public/broken.jpg';
import { ClientError, ErrorTypes } from '../models/Logging';

class HomeGridVideo extends React.Component {
  constructor(props) {
    super(props);
    const { project } = props;
    const { video } = project.media;

    this.state = {
      videoSrc: `${process.env.API_PATH}/video/${video}`,
      posterSrc: '',
      initalLoadComplete: false,
    };

    this.api = new API({
      url: process.env.API_PATH,
    });

    this.api.createEntities([{ name: 'video' }]);

    this.videoPlayer = React.createRef();
    this.MAX_DETAIL_VISIBLE_SECONDS = 4;
    this.timer = null;
  }

  componentDidMount() {
    const { project, setEventError } = this.props;
    const { thumbnail } = project.media;

    fetchImage(thumbnail)
      .then(url => this.setState({ posterSrc: url }))
      .catch(error => setEventError(error));
  }

  componentDidUpdate(prevProps) {
    const { isHovering, project, setEventError } = this.props;
    const { video } = project.media;

    if (isHovering !== prevProps.isHovering) {
      if (isHovering) {
        this.videoPlayer.current.play().catch(error => {
          const clientError = new ClientError(
            ErrorTypes.VideoError,
            `projectID - ${project.projectID} video - ${video}`,
            false,
            error.message,
          );
          setEventError(clientError);
        });

        this.startTimer();
      } else {
        const player = this.videoPlayer.current;
        const { readyState } = player;

        if (readyState > 1) {
          this.videoPlayer.current.pause();
          this.videoPlayer.current.currentTime = 0;
        }

        this.stopTimer();
      }
    }
  }

  onLoaded = () => {
    const { downloadCompleteCallback } = this.props;
    downloadCompleteCallback();
  };

  startTimer = () => {
    this.detailVisibleSeconds = 0;
    this.timer = setInterval(this.onTick, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timer);
  };

  onTick = () => {
    this.detailVisibleSeconds += 1;

    if (this.detailVisibleSeconds === this.MAX_DETAIL_VISIBLE_SECONDS) {
      const { minimizeDetailCallback } = this.props;
      minimizeDetailCallback(true);
      this.detailVisibleSeconds = 0;
    }
  };

  videoLoadError = e => {
    const { setEventError, project } = this.props;
    const { video } = project.media;

    this.addDefaultSrc(e);
    const error = new ClientError(
      ErrorTypes.VideoError,
      `projectID - ${project.projectID} video - ${video}`,
      false,
      'Error loading video',
    );

    setEventError(error);
  };

  addDefaultSrc = e => {
    e.target.poster = brokenImage;
  };

  render = () => {
    const { videoSrc, posterSrc, initalLoadComplete } = this.state;

    return (
      <video
        onLoadStart={() => {
          this.setState({ initalLoadComplete: true });
        }}
        onLoadedData={this.onLoaded}
        onError={this.videoLoadError}
        ref={this.videoPlayer}
        poster={posterSrc}
        loop
        preload="metadata"
        muted
        playsInline
        src={videoSrc}
        className={initalLoadComplete ? 'fadeIn' : 'fadeOut'}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
        <track kind="captions" />
      </video>
    );
  };
}

HomeGridVideo.propTypes = {
  project: PropTypes.object,
  downloadCompleteCallback: PropTypes.func,
  minimizeDetailCallback: PropTypes.func,
  isHovering: PropTypes.bool,
  setEventError: PropTypes.func,
};

export default HomeGridVideo;
