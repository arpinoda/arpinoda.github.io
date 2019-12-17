import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HomeNavTree from './HomeNavTree';
import withScrollSpy from './withScrollSpy';

/**
 * Hamburger menu navigation displayed on mobile devices (width < breakpoint)
 * @param {Array} categories Collection of category models
 */
const HomeNavMobile = ({ categories }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenuOpen() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  const buttonStyle = {
    height: '46px',
    border: 'none',
    background: 'transparent',
    zIndex: 7,
    textAlign: 'right',
    width: '100%',
  };

  const hamburgerStyle = {
    width: '18px',
    height: '18px',
    fill: '#565656',
    paddingTop: '4px',
  };

  const closeStyle = {
    fontSize: '43px',
    lineHeight: '30px',
  };

  const navStyle = {
    position: 'fixed',
    zIndex: 6,
    bottom: 0,
    top: '0px',
    right: 0,
    WebkitBoxShadow: '-8px 5px 15px -2px rgba(0,0,0,0.31)',
    boxShadow: '-8px 5px 15px -2px rgba(0,0,0,0.31)',
  };

  // Additional elements ie hamburger menu, etc
  return (
    <div>
      {/* Hamburger or X icon */}
      <button
        style={buttonStyle}
        className="fixed right-0 left-0 top-0"
        onClick={toggleMenuOpen}
        type="button"
      >
        <svg
          className={`${menuOpen ? 'display-none' : 'inline-block'}`}
          style={hamburgerStyle}
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          viewBox="0 0 24 24"
          role="img"
        >
          <path d="m4 7h16c1.1 0 2-.9 2-2s-.9-2-2-2h-16c-1.1 0-2 .9-2 2s.9 2 2 2zm16 10h-16c-1.1 0-2 .9-2 2s.9 2 2 2h16c1.1 0 2-.9 2-2s-.9-2-2-2zm0-7h-16c-1.1 0-2 .9-2 2s.9 2 2 2h16c1.1 0 2-.9 2-2s-.9-2-2-2z" />
        </svg>
        <span
          style={closeStyle}
          className={`${!menuOpen ? 'display-none' : 'inline-block'}`}
        >
          ×
        </span>
      </button>

      {/* Navigation bar wrapper */}
      <div className={`${!menuOpen ? 'display-none' : ''}`}>
        <HomeNavTree style={navStyle} categories={categories} />
      </div>

      {/* Scrollable main content, close on tap */}
      <div
        className={`${
          menuOpen ? 'inline-block' : 'display-none'
        } fixed top-0 left-0 right-0`}
        onClick={closeMenu}
        role="presentation"
        style={{
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 5,
          width: 'calc(100% - 215px)',
        }}
      />
    </div>
  );
};

HomeNavMobile.propTypes = {
  categories: PropTypes.array,
};

export default withScrollSpy(HomeNavMobile);
