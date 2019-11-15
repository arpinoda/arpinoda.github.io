import React from 'react';
import PropTypes from 'prop-types';
import HomeNavTree from './HomeNavTree';
import withScrollSpy from './withScrollSpy';

/**
 * Hamburger menu navigation displayed on mobile devices (width < breakpoint)
 * @param {Array} categories Collection of category models
 */
const HomeNavMobile = ({ categories }) => (
  // Additional elements ie hamburger menu, etc
  <HomeNavTree categories={categories} />
);

HomeNavMobile.propTypes = {
  categories: PropTypes.array,
};

export default withScrollSpy(HomeNavMobile);
