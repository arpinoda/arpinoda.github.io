import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import HomeGridImage from './HomeGridImage';

class HomeGridFigure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovering: false,
    };
  }

  handleMouseHover = val => {
    this.setState({ isHovering: val });
  };

  render = () => {
    const { project } = this.props;
    const { isHovering } = this.state;
    const hasVideo = project.images.video !== undefined;

    const gifStyle = {
      WebkitAnimation: isHovering
        ? 'sk-rotateplane 1.2s infinite ease-in-out'
        : 'none',
      animation: isHovering
        ? 'sk-rotateplane 1.2s infinite ease-in-out'
        : 'none',
      color: !isHovering ? 'inherit' : 'rgba(0,0,0,0)',
      display: hasVideo ? 'block' : 'none',
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
        <HomeGridImage project={project} />
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
