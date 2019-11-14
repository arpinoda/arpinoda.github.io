import React from 'react';
import PropTypes from 'prop-types';

/**
 * A component capable of recursively rendering children. Final markup renders <ul> & <li> elements.
 * @param {object} - The model being rendered. Currently configured for a Category model.
 * @param {renderCallback} - A callback function that renders the item
 */
const TreeItem = ({ item, render }) => (
  <li className={item.className ? item.className : ''}>
    {render(item)}
    {item.children.length > 0 && (
      <ul key={item.categoryID}>
        {item.children.map(child => (
          <TreeItem key={child.categoryID} item={child} render={render} />
        ))}
      </ul>
    )}
  </li>
);

TreeItem.propTypes = {
  item: PropTypes.object,
  render: PropTypes.func,
};

export default TreeItem;
