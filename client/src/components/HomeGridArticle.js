import React from 'react';
import PropTypes from 'prop-types';
import HomeGridFigure from './HomeGridFigure';

const HomeGridArticle = ({ category, ...props }) => {
  const divClassName = `col-12 bg-white ${
    category.className ? category.className : ''
  }`;
  const headings = category.breadcrumbs.split('>');
  const hidden = headings.slice(0, headings.length - 1);

  return (
    <article id={category.elementID}>
      <div className={divClassName}>
        <h3 className="pt2 pb2 h3">
          {hidden.map(title => (
            <span className="white" key={title}>{`${title} > `}</span>
          ))}
          {headings[headings.length - 1]}
        </h3>
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
