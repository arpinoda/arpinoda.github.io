import React from 'react';
import PropTypes from 'prop-types';

const TreeItem = ({ item, render }) => (
  <li className={item.className ? item.className : ''}>
    {render(item)}
    {item.children ? (
      <ul key={item.categoryID}>
        {item.children &&
          item.children.map(child => (
            <TreeItem key={child.categoryID} item={child} render={render} />
          ))}
      </ul>
    ) : (
      <></>
    )}
  </li>
);

TreeItem.propTypes = {
  item: PropTypes.object,
  render: PropTypes.func,
};

export default TreeItem;
