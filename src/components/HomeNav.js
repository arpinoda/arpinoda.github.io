import React from 'react';
import PropTypes from 'prop-types';
import TreeItem from './TreeItem';
import HomeNavLink from './HomeNavLink';
import withScrollSpy from './withScrollSpy';

const HomeNav = ({ categories }) => (
  <nav className="relative">
    <ul className="list-reset pl3 pt4 pr3 pb4 fixed top-0 bottom-0">
      {categories &&
        categories.map(category => (
          <TreeItem
            item={category}
            key={category.categoryID}
            render={item => (
              <HomeNavLink category={item}>{item.name}</HomeNavLink>
            )}
          />
        ))}
    </ul>
  </nav>
);

HomeNav.propTypes = {
  categories: PropTypes.array,
};

export default withScrollSpy(HomeNav);
