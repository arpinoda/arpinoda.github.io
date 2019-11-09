import React from 'react';
import PropTypes from 'prop-types';

const ProjectList = ({ style, projects, onClick }) => (
  <div style={style}>
    <h3>Projects</h3>
    <ul>
      {projects.map(project => (
        <li
          onClick={() => onClick(project.id)}
          onKeyPress={() => onClick(project.id)}
          role="presentation"
          key={project.id}
        >
          {project.name}
        </li>
      ))}
    </ul>
  </div>
);

export default ProjectList;

ProjectList.propTypes = {
  style: PropTypes.object,
  projects: PropTypes.array,
  onClick: PropTypes.func,
};
