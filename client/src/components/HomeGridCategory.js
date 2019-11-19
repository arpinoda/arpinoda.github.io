import React from 'react';
import PropTypes from 'prop-types';
import HomeGridProject from './HomeGridProject';

/**
 * Renders a category and their child project(s)
 * @param {Object} category A category model to render
 */
const HomeGridCategory = ({ category, ...props }) => {
  const divClassName = `col-12 bg-white ${
    category.className ? category.className : ''
  }`;
  const headings = category.breadcrumbs.split('>');
  const hidden = headings.slice(0, headings.length - 1);

  return (
    <article id={category.elementID}>
      {/* Category Breadcrumbs */}
      <div className={divClassName}>
        <h3 className="pt2 pb2 h3">
          {hidden.map(title => (
            <span className="white" key={title}>{`${title} > `}</span>
          ))}
          {headings[headings.length - 1]}
        </h3>
      </div>

      {/* Category Projects */}
      <div className="projects flex flex-wrap">
        {category.projects &&
          category.projects.map(project => (
            <HomeGridProject
              {...props}
              key={project.projectID}
              project={project}
            />
          ))}
      </div>
    </article>
  );
};

HomeGridCategory.propTypes = {
  projects: PropTypes.array,
  category: PropTypes.object,
};

export default HomeGridCategory;
