import React from 'react';
import PropTypes from 'prop-types';
import API from '../util/API';
// import { LOADING_IMAGE } from '../util/UI';
import brokenImage from '../static/images/public/broken.jpg';

// const HomeGridVideo = (props, { isHovering,
// project, className, onMaxHover, onDownloadComplete}) => {

//   return (
//     <ProjectImage

//     />
//   );
// };

class HomeGridVideo extends React.Component {
  constructor(props) {
    super(props);
    const { project } = props;
    const { video } = project.media;

    this.state = {
      videoSrc: `${process.env.API_PATH}/video/${video}`,
      // posterSrc: LOADING_IMAGE,
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
    // const { project } = this.props;
    // const { thumbnail } = project.media;
    // fetchProtectedImage(thumbnail)
    //   .then(url => this.setState({ posterSrc: url }))
    //   .catch(error => setEventError(error));
  }

  componentDidUpdate(prevProps) {
    const { isHovering } = this.props;
    // const { video } = project.media;

    if (isHovering !== prevProps.isHovering) {
      if (isHovering) {
        this.videoPlayer.current.play().catch(error => {
          // const clientError = new ClientError(
          //   ErrorTypes.VideoError,
          //   `projectID - ${project.projectID} video - ${video}`,
          //   false,
          //   error.message,
          // );
          // setEventError(clientError);
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
    // const { onDownloadComplete } = this.props;
    // onDownloadComplete();
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
    // const { setEventError, project } = this.props;
    // const { video } = project.media;

    this.addDefaultSrc(e);
    // const error = new ClientError(
    //   ErrorTypes.VideoError,
    //   `projectID - ${project.projectID} video - ${video}`,
    //   false,
    //   'Error loading video',
    // );

    // setEventError(error);
  };

  addDefaultSrc = e => {
    e.target.poster = brokenImage;
  };

  render = () => {
    const { videoSrc, initalLoadComplete } = this.state;
    const { className } = this.props;

    return (
      <>
        <video
          onLoadStart={() => {
            this.setState({ initalLoadComplete: true });
          }}
          onLoadedData={this.onLoaded}
          onError={this.videoLoadError}
          ref={this.videoPlayer}
          loop
          /* poster="http://public.media.smithsonianmag.com/legacy_blog/smiley-face-1.jpg" */
          preload="none"
          muted
          playsInline
          src={videoSrc}
          style={{ width: '100%', height: '100%' }}
          className={`${className} ${
            initalLoadComplete ? 'fadeIn' : 'fadeOut'
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
          <track kind="captions" />
        </video>
      </>
    );
  };
}

HomeGridVideo.propTypes = {
  project: PropTypes.object,
  minimizeDetailCallback: PropTypes.func,
  isHovering: PropTypes.bool,
  className: PropTypes.string,
  // setEventError: PropTypes.func,
};

export default HomeGridVideo;
