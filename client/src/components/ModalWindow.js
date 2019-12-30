import React from 'react';
import PropTypes from 'prop-types';

const ModalWindow = props => {
  const { onCloseCallback, children, onlyShowBackground } = props;

  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    background: 'rgba(0, 0, 0, 0.7)',
    WebkitAnimation: 'fadeIn .2s',
    animation: 'fadeIn .2s',
    MozAnimation: 'fadeIn .2s',
  };

  const windowStyle = {
    display: onlyShowBackground ? 'none' : 'block',
    position: 'absolute',
    background: '#fff',
    top: 25,
    maxWidth: '885px',
    zIndex: 2,
    left: 0,
    right: 0,
    width: '100%',
    margin: '0 auto',
  };

  return (
    <div
      onClick={e => {
        onCloseCallback(e);
      }}
      role="presentation"
      style={backgroundStyle}
    >
      <div className="modal" style={windowStyle}>
        {children}
      </div>
    </div>
  );
};

ModalWindow.propTypes = {
  onCloseCallback: PropTypes.func,
  children: PropTypes.node,
  onlyShowBackground: PropTypes.bool,
};

export default ModalWindow;
