import React from 'react';
import API from '../util/API';
import Category from '../models/Category';
import { HourglassSpinner } from './Loading';
import { ClientError } from '../../../server/errors';

const withDataLoader = OriginalComponent => {
  class Wrapped extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        categories: [],
        scrollIDs: [],
        isLoading: true,
        error: null,
      };

      this.api = new API({
        url: process.env.API_PATH,
      });

      this.api.createEntities([{ name: 'project' }, { name: 'category' }]);
    }

    componentDidMount() {
      this.bootstrapJSON();
    }

    shouldComponentUpdate() {
      const { categories } = this.state;
      return categories.length === 0;
    }

    bootstrapJSON = () => {
      /** Makes API requests for project and category resources */
      this.setState({ isLoading: true });

      this.getProjects()
        .then(res => res.json())
        .then(projects => {
          this.bootstrapSuccess = this.bootstrapSuccess(projects);
        })
        .then(this.getCategories)
        .then(res => res.json())
        .then(categories => this.bootstrapSuccess(categories))
        .catch(error => {
          error = new ClientError(error);
          error.send();
          this.setState({ isLoading: false, error });
        });
    };

    getProjects = () => this.api.endpoints.project.getAll();

    getCategories = () => this.api.endpoints.category.getAll();

    bootstrapSuccess = projectsJSON => categoriesJSON => {
      /** Utilizes currying for processing API results of getProjects & getCategories */

      // Sort categories by index attribute.
      const categories = [];
      const sortedCatgories = categoriesJSON.sort((a, b) => a.index - b.index);

      const parentCategoriesJSON = sortedCatgories.filter(
        item => item.parentIDs === null,
      );

      // Recursively create Category objects, starting with parent categories
      parentCategoriesJSON.map(parentJSON => {
        const parent = new Category(parentJSON);
        parent.subcategoriesFrom(sortedCatgories);
        categories.push(parent);
        return categories;
      });

      // Assign projects to their category(ies)
      categories.forEach(category => {
        category.projectsFrom(projectsJSON);
      });

      // Collection of anchor element id's used for ScrollSpy HOC
      let scrollIDs = [];
      categories.forEach(category => {
        scrollIDs.push(category.getElementIDs());
      });
      scrollIDs = scrollIDs.flat(Infinity);

      this.setState({ categories, scrollIDs, isLoading: false });
    };

    render() {
      const { categories, scrollIDs, isLoading, error } = this.state;

      if (error) {
        throw error;
      }

      if (isLoading) {
        return <HourglassSpinner />;
      }

      return (
        <OriginalComponent
          {...this.props}
          categories={categories}
          scrollIDs={scrollIDs}
          isLoading={isLoading}
        />
      );
    }
  }

  return Wrapped;
};

export default withDataLoader;
