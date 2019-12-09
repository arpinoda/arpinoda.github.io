import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveLayout from './ResponsiveLayout';
import GridProjectDesktop from './GridProjectDesktop';
import GridProjectMobile from './GridProjectMobile';
import LoadingTile from './LoadingTile';

/**
 * Represents one square tile on the Home screen
 */
const GridProject = ({ project }) => {
  const className = 'absolute left-0 top-0';

  return (
    <figure className="mr3 mb3 relative overflow-hidden">
      <LoadingTile />
      <ResponsiveLayout
        breakpoint={767}
        renderDesktop={() => (
          <GridProjectDesktop className={className} project={project} />
        )}
        renderMobile={() => (
          <GridProjectMobile className={className} project={project} />
        )}
      />
    </figure>
  );
};

GridProject.propTypes = {
  project: PropTypes.object,
};

export default GridProject;
