import React from 'react';
import PropTypes from 'prop-types';
import HomeNavTree from './HomeNavTree';
import withScrollSpy from './withScrollSpy';

/**
 * Main navigation displayed on left side of screen for desktop devices (width > breakpoint)
 * @param {Array} categories Collection of category models
 */
const HomeNavDesktop = ({ categories }) => (
  <HomeNavTree categories={categories} />
);

HomeNavDesktop.propTypes = {
  categories: PropTypes.array,
};

export default withScrollSpy(HomeNavDesktop);
