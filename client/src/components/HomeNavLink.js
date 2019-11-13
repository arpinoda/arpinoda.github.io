import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { HASH_PREFIX } from '../util/UI';

/**
 * The actual clickable NavLink component (anchor element) within HomeNav
 * @param {Object} children - The react property that contains "content" within
 * parent component's opening & closing tags.
 * @param {Object} props - Parent properties that have been spread
 */
const HomeNavLink = ({ children, ...props }) => {
  const { category, className } = props;
  const formatHash = value => `${HASH_PREFIX}${value}`;

  const toHREF = `/${formatHash(category.urlPath)}`;

  const checkActive = (match, location) => {
    if (!location) return false;
    const { hash } = location;

    return hash === formatHash(category.urlPath);
  };

  return (
    <NavLink isActive={checkActive} replace to={toHREF} className={className}>
      {children}
    </NavLink>
  );
};

HomeNavLink.propTypes = {
  children: PropTypes.node,
  category: PropTypes.object,
  className: PropTypes.string,
};

export default HomeNavLink;
