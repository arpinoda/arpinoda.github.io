import React from 'react';
import PropTypes from 'prop-types';
import GridProject from './GridProject';

/**
 * Renders a category and their child project(s)
 * @param {Object} category A category model to render
 */
const GridCategory = ({ category }) => {
  const divClassName = `col-12  category-header ${category.className || ''}`;

  const headings = category.breadcrumbs.split('>');

  // Category breadcrumb: The objective is to display only the deepest child within a set.
  // e.g. "grandchild" within the following breadcrumb "parent > child > grandchild"
  // We split the breadcrumb set by '>', and apply white font color to all parent elements
  const hidden = headings.slice(0, headings.length - 1);

  return (
    <article id={category.elementID}>
      {/* Category Breadcrumbs */}
      <div className={divClassName}>
        <h3 className="pl2 pt2 pb2 h3">
          {hidden.map(title => (
            <span className="white" key={title}>{`${title} > `}</span>
          ))}
          {headings[headings.length - 1]}
        </h3>
      </div>

      {/* Category Projects */}
      <div className="projects pl2 flex flex-wrap">
        {category.projects &&
          category.projects.map(project => (
            <GridProject key={project.projectID} project={project} />
          ))}
      </div>
    </article>
  );
};

GridCategory.propTypes = {
  projects: PropTypes.array,
  category: PropTypes.object,
};

export default GridCategory;
