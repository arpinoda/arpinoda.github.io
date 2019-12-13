import React from 'react';
import GridProjectDesktop from './GridProjectDesktop';
import GridProjectMobile from './GridProjectMobile';
import LoadingTile from './LoadingTile';
import { deviceHasTouchScreen } from '../util/UI';

/**
 * Represents one square tile on the Home screen
 */
const GridProject = props => {
  const className = 'absolute left-0 top-0';

  return (
    <figure className="relative overflow-hidden mr2 mb2">
      <LoadingTile />
      {deviceHasTouchScreen ? (
        <GridProjectMobile {...props} className={className} />
      ) : (
        <GridProjectDesktop {...props} className={className} />
      )}
    </figure>
  );
};

export default GridProject;
