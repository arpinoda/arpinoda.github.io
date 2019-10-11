import React from 'react';
import PropTypes from 'prop-types';
import { styleToObject } from '../util/UI';
import VideoPlayer from '../util/VideoPlayer';

class ProjectDetailVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerStyle: {
        display: 'none',
      },
    };

    this.playerRef = React.createRef();
    this.videoRef = React.createRef();
  }

  onLoadedData = () => {
    this.createPlayer(this.playerRef.current);
    this.applyPlayerStyling();
  };

  applyPlayerStyling = () => {
    const { video } = this.props;
    const height = this.videoRef.current.offsetHeight;
    const playerStyle = styleToObject(
      `zIndex: 1;position: absolute;height: ${height}px; ${video.css}`,
    );
    this.setState({ playerStyle });
  };

  createPlayer = playerRef => {
    const player = new VideoPlayer(playerRef);
    return player;
  };

  render = () => {
    const { video } = this.props;
    const videoSrc = `${process.env.API_PATH}/video/${video.item}`;

    const videoStyle = styleToObject(
      `zIndex: -1;position: absolute; ${video.css}`,
    );

    const { playerStyle } = this.state;

    return (
      <>
        <div
          style={playerStyle}
          ref={this.playerRef}
          className="player videoplayer"
        >
          {' '}
        </div>
        <video
          ref={this.videoRef}
          style={videoStyle}
          onLoadedData={this.onLoadedData}
          playsInline
          type="video/mp4"
          loop
          controlsList="nodownload"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
          <track kind="captions" />
        </video>
      </>
    );
  };
}

ProjectDetailVideo.propTypes = {
  video: PropTypes.object,
};

export default ProjectDetailVideo;
