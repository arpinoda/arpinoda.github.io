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
    const { project, className } = this.props;

    return (
      <img
        src={imageSrc}
        alt={project.name}
        onLoad={this.handleImageLoaded}
        className={className}
      />
    );
  };
}

HomeGridThumbnail.propTypes = {
  project: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default HomeGridThumbnail;
