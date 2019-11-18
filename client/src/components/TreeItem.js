import React from 'react';
import PropTypes from 'prop-types';

/**
 * A component capable of recursively rendering children. Final markup renders <ul> & <li> elements.
 * @param {object} item The model being rendered. Currently configured for a Category model.
 * @param {renderCallback} render A callback function that renders the item
 * @param {String} childGroupClass Class stings applied to child <ul> element
 */
const TreeItem = ({ item, render, childGroupClass }) => (
  <li className={item.className ? item.className : ''}>
    {render(item)}
    {item.children.length > 0 && (
      <ul className={childGroupClass} key={item.categoryID}>
        {item.children.map(child => (
          <TreeItem
            key={child.categoryID}
            item={child}
            childGroupClass={childGroupClass}
            render={render}
          />
        ))}
      </ul>
    )}
  </li>
);

TreeItem.propTypes = {
  item: PropTypes.object,
  render: PropTypes.func,
  childGroupClass: PropTypes.string,
};

export default TreeItem;
