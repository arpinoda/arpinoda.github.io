import React from 'react';
import PropTypes from 'prop-types';
import API from '../util/API';

class HomeGridVideo extends React.Component {
  constructor(props) {
    super(props);
    const { project } = props;
    const { video } = project.images;

    this.state = {
      videoSrc: video ? `${process.env.API_PATH}/video/${video}` : '',
    };

    this.api = new API({
      url: process.env.API_PATH,
    });

    this.api.createEntities([{ name: 'video' }]);

    this.videoPlayer = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    const { isHovering } = this.props;

    if (nextProps.isHovering && !isHovering) {
      // play video
      this.videoPlayer.current.play();
      console.log('playing');
    } else {
      // pause video
      this.videoPlayer.current.pause();
      console.log('paused');
    }
  }

  onLoaded = () => {
    const { downloadComplete } = this.props;
    downloadComplete();
  };

  render = () => {
    const { className } = this.props;
    const { videoSrc } = this.state;

    return (
      <video
        // onProgress={this.downloadProgress}
        onLoadedData={this.onLoaded}
        ref={this.videoPlayer}
        loop
        preload="none"
        muted
        playsInline
        src={videoSrc}
        className={`${className} fit`}
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
  className: PropTypes.string,
  downloadComplete: PropTypes.func,
  isHovering: PropTypes.bool,
};

export default HomeGridVideo;
