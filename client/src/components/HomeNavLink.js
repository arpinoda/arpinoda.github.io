import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { HASH_PREFIX } from '../util/UI';

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
