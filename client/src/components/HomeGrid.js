import React from 'react';
import PropTypes from 'prop-types';
import TreeItem from './TreeItem';
import HomeGridArticle from './HomeGridArticle';

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
      <main className="pb4 pl2">
        {categories &&
          categories.map(category => (
            <TreeItem
              item={category}
              key={`HomeGrid-${category.categoryID}`}
              render={item => (
                <HomeGridArticle
                  id={item.elementID}
                  key={`Article-${item.categoryID}`}
                  category={item}
                />
              )}
            />
          ))}
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
