import React from 'react';
import PropTypes from 'prop-types';
import { fetchImage } from '../util/UI';

class HomeGridThumbnail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSrc: '',
    };
  }

  componentDidMount() {
    const { project } = this.props;
    const { thumbnail } = project.images;

    // LoadingImage has just displayed,
    fetchImage(thumbnail).then(url => this.setState({ imageSrc: url }));
  }

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
