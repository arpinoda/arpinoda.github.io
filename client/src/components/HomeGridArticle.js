import React from 'react';
import PropTypes from 'prop-types';
import HomeGridFigure from './HomeGridFigure';

const HomeGridArticle = ({ category, ...props }) => {
  const className = `col-12 ${category.className ? category.className : ''}`;
  return (
    <article id={category.elementID} className="flex pt4 flex-wrap">
      <div className={className}>
        <h4 className="mt2 mr3 mb2 pt2 h3 border-top">
          {category.displayCrumbs}
        </h4>
      </div>
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
