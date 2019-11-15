import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const WindowDimensionsCtx = createContext(null);

/**
 * Stores the window dimensions and attaches a listener to resize event.
 * Exposes a single provider context for child components to access via useWindowDimensions().
 * @param {Object} children The react property containing "content" within
 * parent component's opening & closing tags.
 */
const WindowDimensionsProvider = ({ children }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <WindowDimensionsCtx.Provider value={dimensions}>
      {children}
    </WindowDimensionsCtx.Provider>
  );
};

WindowDimensionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WindowDimensionsProvider;
export const useWindowDimensions = () => useContext(WindowDimensionsCtx);
