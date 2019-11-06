import React from 'react';
import PropTypes from 'prop-types';
import API from '../util/API';
import { fetchImage } from '../util/UI';

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
    const { project } = this.props;
    const { thumbnail } = project.media;

    fetchImage(thumbnail).then(url => this.setState({ posterSrc: url }));
  }

  componentDidUpdate(prevProps) {
    const { isHovering } = this.props;

    if (isHovering !== prevProps.isHovering) {
      if (isHovering) {
        this.videoPlayer.current.play().catch(error => {
          console.log(this.videoPlayer.current.readyState);
          console.log(error);
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

  render = () => {
    const { videoSrc, posterSrc, initalLoadComplete } = this.state;

    return (
      <video
        onLoadStart={() => {
          this.setState({ initalLoadComplete: true });
        }}
        onLoadedData={this.onLoaded}
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
};

export default HomeGridVideo;
