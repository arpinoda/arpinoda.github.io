import React from 'react';
import PropTypes from 'prop-types';
import { fetchImage } from '../util/UI';

class ProjectDetailImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blobURL: '',
    };
  }

  componentDidMount() {
    const { media } = this.props;
    fetchImage(media.item).then(url => this.setState({ blobURL: url }));
  }

  render() {
    const { media } = this.props;
    const { blobURL } = this.state;

    return (
      <section>
        <img src={blobURL} alt={media.alt} className="fit left" />
      </section>
    );
  }
}

ProjectDetailImage.propTypes = {
  media: PropTypes.object,
};

export default ProjectDetailImage;
