import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { HASH_PREFIX } from '../util/UI';

const HomeNavLink = ({ children, ...props }) => {
  const { category, className } = props;

  return (
    <NavLink
      replace
      to={`/${HASH_PREFIX}${category.urlPath}`}
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
