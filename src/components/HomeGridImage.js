import React from 'react';
import PropTypes from 'prop-types';
import API from '../util/API';
import { LOADING_IMAGE, createBlobURL } from '../util/UI';

class HomeGridThumbnail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSrc: LOADING_IMAGE,
    };

    this.api = new API({
      url: process.env.API_PATH,
    });

    this.api.createEntities([{ name: 'image' }]);
  }

  fetchImage = id => this.api.endpoints.image.getOne(id);

  handleImageLoaded = () => {
    const { imageSrc } = this.state;
    const { project } = this.props;
    const { thumbnail } = project.images;

    if (imageSrc === LOADING_IMAGE) {
      // LoadingImage has just displayed, fetch the project thumbnail
      this.fetchImage(thumbnail)
        .then(res => createBlobURL(res))
        .then(url => this.setState({ imageSrc: url }));
    }
  };

  render = () => {
    const { imageSrc } = this.state;
    const { project } = this.props;

    return (
      <img
        className="block"
        src={imageSrc}
        alt={project.name}
        onLoad={this.handleImageLoaded}
      />
    );
  };
}

HomeGridThumbnail.propTypes = {
  project: PropTypes.object.isRequired,
};

export default HomeGridThumbnail;

/*


fetchVideo = id => this.api.endpoints.video.getOne(id);

this.fetchVideo('01.mp4')
  .then(res => createBlobURL(res))
  .then(url => this.setState({ videoSrc: url }));

*/
