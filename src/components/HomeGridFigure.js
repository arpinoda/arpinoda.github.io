import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { LOADING_IMAGE } from '../util/UI';
import AUTH from '../util/AUTH';

class HomeGridFigure extends React.Component {
  Auth = new AUTH();

  constructor(props) {
    super(props);

    this.state = {
      isHovering: false,
      imageSrc: LOADING_IMAGE,
    };

    this.randomColor = this.getRandomColor();
  }

  getRandomColor = () => {
    const colors = [
      'fafafa',
      '592607',
      '17b9b3',
      'ea943d',
      '334677',
      '3a8635',
      'b2a73c',
      'f5c4f8',
      'ceabee',
      '81ac47',
      'c5294c',
      '9d440e',
      'ca39ac',
      '5627ed',
      '5600d9',
    ];
    return colors[Math.floor(Math.random() * 15)];
  };

  handleMouseHover = val => {
    this.setState({ isHovering: val });
  };

  handleImageLoaded = () => {
    const { imageSrc } = this.state;
    const { project } = this.props;

    if (imageSrc === LOADING_IMAGE) {
      const thumbnail = project.images.thumbnail.replace(
        'eeeeee',
        this.randomColor,
      );

      // Use auth fetch to obtain image, then base64 encode
      this.setState({
        imageSrc: thumbnail, // this.toDataURL(thumbnail),
      });
    }
  };

  toDataURL = url => {
    this.Auth.fetch(url)
      .then(response => response.blob())
      .then(
        blob =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          }),
      );
  };

  render = () => {
    const { project } = this.props;
    const { isHovering, imageSrc } = this.state;

    const gifStyle = {
      WebkitAnimation: isHovering
        ? 'sk-rotateplane 1.2s infinite ease-in-out'
        : 'none',
      animation: isHovering
        ? 'sk-rotateplane 1.2s infinite ease-in-out'
        : 'none',
      content: isHovering ? '' : 'GIF',
      color: !isHovering ? 'inherit' : 'rgba(0,0,0,0)',
    };

    return (
      <figure
        className={`mr3 mb3 relative 
          ${isHovering ? 'active' : ''}`}
        onMouseEnter={() => {
          this.handleMouseHover(true);
        }}
        onMouseLeave={() => {
          this.handleMouseHover(false);
        }}
      >
        <img
          className="block"
          src={imageSrc}
          alt={project.name}
          onLoad={this.handleImageLoaded}
        />
        <div>
          <div className="p1">
            <p className="bold">{project.name}</p>
            <p className="line-height-4">{project.description}</p>
          </div>
        </div>
        <NavLink
          to={`/project/${project.projectID}`}
          className="absolute top-0 left-0 bottom-0 right-0"
        />
        <div className="spinner" style={gifStyle} />
      </figure>
    );
  };
}

HomeGridFigure.propTypes = {
  project: PropTypes.object.isRequired,
};

export default HomeGridFigure;
