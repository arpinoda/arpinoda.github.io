import React from 'react';
import PropTypes from 'prop-types';
import HomeGridSection from './HomeGridSection';

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
            <HomeGridSection
              key={category.categoryID}
              category={category}
              {...this.props}
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
