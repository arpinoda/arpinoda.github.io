import React from 'react';
import PropTypes from 'prop-types';
import { styleToObject } from '../util/UI';

class ProjectDetailVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        display: 'none',
      },
    };
  }

  componentDidMount() {
    console.log('mounted video');
  }

  setStyle = () => {
    const { video } = this.props;

    // Set style to video component
    const combinedStyle = `zIndex: -1;position: absolute; ${video.css}`;
    const style = styleToObject(combinedStyle);
    console.log(style);
    this.setState({ style });
  };

  render = () => {
    const { video } = this.props;
    const videoSrc = `${process.env.API_PATH}/video/${video.item}`;
    const { style } = this.state;

    return (
      <>
        <div className="player videoplayer"> </div>
        <video
          onLoadedData={this.setStyle}
          playsInline
          type="video/mp4"
          loop
          controlsList="nodownload"
          style={style}
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
