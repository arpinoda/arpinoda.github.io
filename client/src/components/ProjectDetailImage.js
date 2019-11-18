import React from 'react';
import PropTypes from 'prop-types';
import ProjectDetailVideo from './ProjectDetailVideo';
import { LOADING_IMAGE } from '../util/UI';
import brokenImage from '../static/images/public/broken.jpg';

class ProjectDetailImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blobURL: LOADING_IMAGE,
    };
  }

  componentDidMount() {
    // const { image, setEventError } = this.props;
    // getProtectedImage(image.item)
    //   .then(url => this.setState({ blobURL: url }))
    //   .catch(error => setEventError(error));
  }

  addDefaultSrc = e => {
    e.target.src = brokenImage;
  };

  render() {
    const { image, setEventError } = this.props;
    const { blobURL } = this.state;

    const imageMarkup = (
      <img
        src={blobURL}
        onError={this.addDefaultSrc}
        key={image.item}
        alt={image.alt}
        className="left col-12"
      />
    );
    let videoMarkup = null;

    // Prevent unnecessary component update (double-rendering) of video
    if (blobURL !== LOADING_IMAGE) {
      if (image.video) {
        const { video } = image;
        videoMarkup = (
          <ProjectDetailVideo
            key={video.item}
            isWithinImage
            video={video}
            setEventError={setEventError}
          />
        );
      }
    }

    // Return multiple elements if the image has a video component
    const returnElement = videoMarkup
      ? [imageMarkup, videoMarkup]
      : imageMarkup;

    return returnElement;
  }
}

ProjectDetailImage.propTypes = {
  image: PropTypes.object,
  setEventError: PropTypes.func,
};

export default ProjectDetailImage;
