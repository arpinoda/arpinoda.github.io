import React from 'react';
import PropTypes from 'prop-types';
import HomeGridFigure from './HomeGridFigure';

const HomeGridArticle = ({ category, ...props }) => {
  const divClassName = `col-12 ${category.className ? category.className : ''}`;
  return (
    <article id={category.elementID} className="flex flex-wrap">
      <div className={divClassName}>
        <h3 className="pt2 pr3 pb2 h3">{category.breadcrumbs}</h3>
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
