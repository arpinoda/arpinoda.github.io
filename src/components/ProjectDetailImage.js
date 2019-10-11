import React from 'react';
import PropTypes from 'prop-types';
import ProductDetailVideo from './ProjectDetailVideo';
import { fetchImage, LOADING_IMAGE } from '../util/UI';

class ProjectDetailImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blobURL: LOADING_IMAGE,
    };
  }

  componentDidMount() {
    const { image } = this.props;
    fetchImage(image.item).then(url => this.setState({ blobURL: url }));
  }

  render() {
    const { image } = this.props;
    const { blobURL } = this.state;

    const imageMarkup = (
      <img src={blobURL} key={image.item} alt={image.alt} className="left" />
    );
    let videoMarkup = null;

    // Prevent unnecessary component update (double-rendering) of video
    if (blobURL !== LOADING_IMAGE) {
      if (image.video) {
        const { video } = image;
        videoMarkup = (
          <ProductDetailVideo key={video.item} isWithinImage video={video} />
        );
      }
    }

    /*
      Final markup of image with embedded video
      <section> <--- ProjectDetailSection
        <img src="./static/images/protected/02-08.png" /> <--- ProjectDetailImage

        <div class="player" videoplayer></div>
        <video playsline type="video/mp4" loop controlsList="nodownload">
          <source src="./static/videos/02-08.mp4#t=0.1" type="video/mp4" />
        </video>

      </section>
    */

    // Return multiple elements if the image has a video component
    const returnElement = videoMarkup
      ? [imageMarkup, videoMarkup]
      : imageMarkup;

    return returnElement;
  }
}

ProjectDetailImage.propTypes = {
  image: PropTypes.object,
};

export default ProjectDetailImage;
