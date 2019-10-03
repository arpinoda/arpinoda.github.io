import React from 'react';
import PropTypes from 'prop-types';
import HomeNavLink from './HomeNavLink';
import HomeGridFigure from './HomeGridFigure';

const HomeGridArticle = ({ category, ...props }) => {
  if (category.projects.length === 0 && category.children) {
    return (
      <article id={category.elementID}>
        {category.children.map(child => (
          <HomeGridArticle key={child.categoryID} category={child} {...props} />
        ))}
      </article>
    );
  }

  return (
    <article id={category.elementID} className="flex flex-wrap">
      <HomeNavLink
        category={category}
        className={category.className ? category.className : ''}
      >
        <h4 className="mt2 mr3 mb2 pt2 h3 border-top">
          {category.displayCrumbs}
        </h4>
      </HomeNavLink>
      {category.projects &&
        category.projects.map(project => (
          <HomeGridFigure
            key={project.projectID}
            project={project}
            {...props}
          />
        ))}
    </article>
  );
};

HomeGridArticle.propTypes = {
  projects: PropTypes.array,
  category: PropTypes.object,
};

export default HomeGridArticle;
