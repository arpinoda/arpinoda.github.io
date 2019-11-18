import React from 'react';
import PropTypes from 'prop-types';
import { LOADING_IMAGE } from '../util/UI';
import brokenImage from '../static/images/public/broken.jpg';

class HomeGridImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSrc: LOADING_IMAGE,
    };
  }

  componentDidMount() {
    // const { project, setEventError } = this.props;
    // const { thumbnail } = project.media;
    // LoadingImage has just displayed,
    // fetchProtectedImage(thumbnail)
    //   .then(url => this.setState({ imageSrc: url }))
    //   .catch(error => setEventError(error));
  }

  addDefaultSrc = e => {
    e.target.src = brokenImage;
  };

  render = () => {
    const { imageSrc } = this.state;
    const { project, className } = this.props;

    return (
      <img
        src={imageSrc}
        style={{ height: '100%' }}
        alt={project.name}
        onError={this.addDefaultSrc}
        className={`col-12 ${className}`}
      />
    );
  };
}

HomeGridImage.propTypes = {
  project: PropTypes.object.isRequired,
  className: PropTypes.string,
  // setEventError: PropTypes.func,
};

export default HomeGridImage;
