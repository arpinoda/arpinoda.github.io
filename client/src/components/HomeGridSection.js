import React from 'react';
import PropTypes from 'prop-types';
import HomeNavLink from './HomeNavLink';
import HomeGridArticle from './HomeGridArticle';

// renders root categories and subcategories
const HomeGridSection = ({ category, ...props }) => (
  <section id={category.elementID} className="pt4">
    <HomeNavLink
      category={category}
      className={category.className ? category.className : ''}
    >
      <h2 className="h1 bold center mr3">{category.name}</h2>
    </HomeNavLink>
    {category.children &&
      category.children.length > 0 &&
      category.children.map(subcategory => (
        <HomeGridArticle
          key={subcategory.categoryID}
          category={subcategory}
          {...props}
        />
      ))}
    {category.projects && category.projects.length > 0 && (
      <HomeGridArticle
        key={category.categoryID}
        category={category}
        {...props}
      />
    )}
  </section>
);

HomeGridSection.propTypes = {
  projects: PropTypes.array,
  category: PropTypes.object,
};

export default HomeGridSection;
