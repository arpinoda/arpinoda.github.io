import React from 'react';
import PropTypes from 'prop-types';
import { fetchImage, LOADING_IMAGE } from '../util/UI';

class ProjectDetailImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blobURL: LOADING_IMAGE,
    };
  }

  componentDidMount() {
    const { media } = this.props;
    fetchImage(media.item).then(url => this.setState({ blobURL: url }));
  }

  render() {
    const { media } = this.props;
    const { blobURL } = this.state;

    // Load video only if desired image has loaded
    if (blobURL !== LOADING_IMAGE) {
      if (media.video) {
        console.log('Has video', media.item);
      }
    }

    return <img src={blobURL} alt={media.alt} className="left" />;
  }
}

ProjectDetailImage.propTypes = {
  media: PropTypes.object,
};

export default ProjectDetailImage;
