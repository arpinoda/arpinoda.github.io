import React from 'react';
import PropTypes from 'prop-types';
import { CircularSpinner } from './Loading';

const ModalWindow = props => {
  const { onCloseCallback, children, isLoading, style } = props;

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
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch',
  };

  const modalStyle = {
    display: isLoading ? 'none' : 'block',
    position: 'absolute',
    background: '#fff',
    maxWidth: '885px',
    zIndex: 2,
    left: 0,
    right: 0,
    width: '100%',
    margin: '0 auto',
  };

  return (
    <>
      <div
        onClick={e => {
          onCloseCallback(e);
        }}
        role="presentation"
        style={backgroundStyle}
      />
      {isLoading && <CircularSpinner />}
      <div className="modal" style={{ ...modalStyle, ...style }}>
        {children}
      </div>
    </>
  );
};

ModalWindow.propTypes = {
  onCloseCallback: PropTypes.func,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  style: PropTypes.object,
};

export default ModalWindow;
