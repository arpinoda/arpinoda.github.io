import React from 'react';
import PropTypes from 'prop-types';
import TreeItem from './TreeItem';
import HomeNavLink from './HomeNavLink';

const HomeNavTree = ({ categories, ...props }) => (
  <nav className="relative" style={{ minWidth: '215px' }}>
    <ul
      className="overflow-hidden list-reset pl3 pt4 pb3 fixed top-0 bottom-0"
      style={{ scrollBehavior: 'smooth', maxWidth: '205px' }}
    >
      {categories &&
        categories.map(category => (
          // Render a recursion-capable "TreeItem" component,
          // since category models may be nested within one another.
          <TreeItem
            item={category}
            key={category.categoryID}
            childGroupClass="pl2"
            render={item => (
              <HomeNavLink category={item} {...props}>
                {item.name}
              </HomeNavLink>
            )}
          />
        ))}
    </ul>
  </nav>
);

HomeNavTree.propTypes = {
  categories: PropTypes.array,
};

export default HomeNavTree;
