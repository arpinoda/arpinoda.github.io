import React from 'react';
import PropTypes from 'prop-types';
import useHover from './useHover';

const Range = props => {
  const { percentComplete } = props;

  const style = {
    width: `${percentComplete ? `${percentComplete}%` : 0}`,
    background: '#FF0000',
    height: '100%',
  };

  return <div className="progress__filled" style={style} />;
};

const ProgressBar = props => {
  const style = {
    height: '100%',
    background: 'rgba(0,0,0,0.4)',
  };

  return (
    <div style={style}>
      <Range {...props} />
    </div>
  );
};

const VideoProgressBar = props => {
  const [hoverRef, hovered] = useHover();
  const { percentComplete } = props;
  const style = {
    height: `${hovered ? '15px' : '4px'}`,
    borderRadius: '2px',
  };

  return (
    <div ref={hoverRef} className="absolute z2 bottom-0 col-12" style={style}>
      <ProgressBar percentComplete={percentComplete} />
    </div>
  );
};

Range.propTypes = {
  percentComplete: PropTypes.number,
};

VideoProgressBar.propTypes = {
  percentComplete: PropTypes.number,
};

export default VideoProgressBar;
