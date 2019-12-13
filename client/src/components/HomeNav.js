import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveLayout from './ResponsiveLayout';
import HomeNavDesktop from './HomeNavDesktop';
import HomeNavMobile from './HomeNavMobile';
import { TABLET_BREAKPOINT } from '../util/UI';

/**
 * The site's responsive navigation. Visible (by default) on left for tablet & desktop form factors.
 * Hamburger menu is displayed for mobile devices.
 * @param {Object[]} categories An array of category objects loaded by withDataLoader HOC.
 */
const HomeNav = ({ categories, scrollIDs }) => (
  <ResponsiveLayout
    breakpoint={TABLET_BREAKPOINT}
    renderDesktop={() => (
      <HomeNavDesktop categories={categories} scrollIDs={scrollIDs} />
    )}
    renderMobile={() => (
      <HomeNavMobile categories={categories} scrollIDs={scrollIDs} />
    )}
  />
);

HomeNav.propTypes = {
  categories: PropTypes.array,
  scrollIDs: PropTypes.array,
};

export default HomeNav;
