import React from 'react';
import PropTypes from 'prop-types';
import HomeGridFigure from './HomeGridFigure';

const HomeGridArticle = ({ category, ...props }) => {
  const divClassName = `col-12 ${category.className ? category.className : ''}`;
  return (
    <article id={category.elementID}>
      <div className={divClassName}>
        <h3 className="pt2 pb2 h3">{category.breadcrumbs}</h3>
      </div>
      <div className="projects flex flex-wrap">
        {category.projects &&
          category.projects.map(project => (
            <HomeGridFigure
              key={project.projectID}
              project={project}
              {...props}
            />
          ))}
      </div>
    </article>
  );
};

HomeGridArticle.propTypes = {
  projects: PropTypes.array,
  category: PropTypes.object,
};

export default HomeGridArticle;
