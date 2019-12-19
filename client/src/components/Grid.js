import React from 'react';
import PropTypes from 'prop-types';
import TreeItem from './TreeItem';
import GridCategory from './GridCategory';

/**
 * Grid displaying all categories and projects within Home component
 */
const Grid = props => {
  const { categories } = props;

  return (
    <main>
      <ul>
        {categories &&
          categories.map(category => (
            <TreeItem
              item={category}
              key={`GridCategory-${category.categoryID}`}
              render={item => (
                <GridCategory
                  {...props}
                  id={item.elementID}
                  key={`GridCategory-${item.categoryID}`}
                  category={item}
                />
              )}
            />
          ))}
      </ul>
    </main>
  );
};

Grid.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      categoryID: PropTypes.number,
      name: PropTypes.string,
      urlFragment: PropTypes.string,
      className: PropTypes.string,
      urlPath: PropTypes.string,
      children: PropTypes.array,
      projects: PropTypes.array,
    }),
  ),
};

export default Grid;
