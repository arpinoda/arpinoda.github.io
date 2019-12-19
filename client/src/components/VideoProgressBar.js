import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useHover from './useHover';

const Range = props => {
  const { percentComplete } = props;

  const style = {
    width: `${percentComplete ? `${percentComplete}%` : 0}`,
    background: '#FF0000',
    height: '100%',
    transition: 'width 400ms linear',
    WebkitTransition: 'width 400ms linear',
    MozTransition: 'width 400ms linear',
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
  const { currentTime, totalDuration, seekVideoTo } = props;

  const percentComplete = (100 / totalDuration) * currentTime;

  const style = {
    height: `${hovered ? '15px' : '4px'}`,
    borderRadius: '2px',
    transition: 'height 200ms linear',
    WebkitTransition: 'height 200ms linear',
    MozTransition: 'height 200ms linear',
  };

  function scrub(e) {
    const scrubTime =
      (e.offsetX / hoverRef.current.offsetWidth) * totalDuration;

    if (!Number.isNaN(scrubTime)) {
      seekVideoTo(scrubTime);
    }
  }

  useEffect(() => {
    hoverRef.current.addEventListener('click', scrub);
    return () => {
      hoverRef.current.removeEventListener('click', scrub);
    };
  }, [totalDuration]);

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
  currentTime: PropTypes.number,
  totalDuration: PropTypes.number,
  seekVideoTo: PropTypes.func,
};

export default VideoProgressBar;
