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

    if (props.isWithinImage) {
      this.playerRef = React.createRef();
    }
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
    const { video, isWithinImage } = this.props;
    const videoSrc = `${process.env.API_PATH}/video/${video.item}`;

    const videoStyleString = isWithinImage
      ? `zIndex: -1;position: absolute; ${video.css}`
      : video.css;
    const videoStyle = styleToObject(videoStyleString);

    const { playerStyle } = this.state;
    const playerMarkup = isWithinImage ? (
      <div
        style={playerStyle}
        ref={this.playerRef}
        className="player videoplayer"
      />
    ) : (
      ''
    );

    const videoMarkup = (
      <video
        ref={this.videoRef}
        style={videoStyle}
        onLoadedData={isWithinImage ? this.onLoadedData : null}
        playsInline
        controls={!isWithinImage}
        type="video/mp4"
        loop
        controlsList="nodownload"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
        <track kind="captions" />
      </video>
    );
    return (
      <>
        {playerMarkup}
        {videoMarkup}
      </>
    );
  };
}

ProjectDetailVideo.propTypes = {
  video: PropTypes.object,
  isWithinImage: PropTypes.bool,
};

export default ProjectDetailVideo;
