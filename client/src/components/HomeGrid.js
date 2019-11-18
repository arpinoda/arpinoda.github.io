import React from 'react';
import PropTypes from 'prop-types';
import TreeItem from './TreeItem';
import HomeGridArticle from './HomeGridArticle';

/**
 * Displays categories and projects, adjacent to main navigation within Home component
 */
class HomeGrid extends React.Component {
  shouldComponentUpdate(prevProps) {
    const { categories } = this.props;
    let result = true;

    if (categories) {
      result = categories.length !== prevProps.categories.length;
    }

    return result;
  }

  render = () => {
    const { categories } = this.props;
    return (
      <main>
        <ul className="pl3">
          {categories &&
            categories.map(category => (
              <TreeItem
                item={category}
                key={`HomeGridCategory-${category.categoryID}`}
                render={item => (
                  <HomeGridArticle
                    id={item.elementID}
                    key={`HomeGridArticle-${item.categoryID}`}
                    category={item}
                  />
                )}
              />
            ))}
        </ul>
      </main>
    );
  };
}

HomeGrid.propTypes = {
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

export default HomeGrid;
