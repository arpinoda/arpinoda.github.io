import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { HASH_PREFIX } from '../util/UI';

const HomeNavLink = ({ children, ...props }) => {
  const { category, className } = props;
  const formatHash = hash => `/${HASH_PREFIX}${hash}`;

  const checkActive = (match, location) => {
    if (!location) return false;
    const { hash } = location;
    return hash === formatHash(category.urlPath);
  };

  return (
    <NavLink
      isActive={checkActive}
      replace
      to={formatHash(category.urlPath)}
      className={className}
    >
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
