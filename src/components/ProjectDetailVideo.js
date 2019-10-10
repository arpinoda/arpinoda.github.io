import React from 'react';
import PropTypes from 'prop-types';

class ProjectDetailVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blobURL: '',
    };
  }

  render = () => {
    const { media } = this.props;
    const { blobURL } = this.state;
    return <div test={blobURL}>{media.item}</div>;
  };
}

ProjectDetailVideo.propTypes = {
  media: PropTypes.object,
};

export default ProjectDetailVideo;
