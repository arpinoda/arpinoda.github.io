import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomeNav from './HomeNav';
import HomeGrid from './HomeGrid';
import ProjectDetail from './ProjectDetail';
import withAuth from './withAuth';
import { scrollToWithRetry, HASH_PREFIX } from '../util/UI';
import API from '../util/API';
import Category from '../models/Category';
import { ClientError, ErrorTypes } from '../models/Logging';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: null,
      scrollIDs: null,
    };

    const { setEventError } = this.props;

    this.api = new API({
      url: process.env.API_PATH,
      setEventError,
    });

    this.api.createEntities([{ name: 'project' }, { name: 'category' }]);
  }

  componentDidMount() {
    const { setEventError } = this.props;

    this.getProjects()
      .then(projects => {
        this.fetchSuccess = this.fetchSuccess(projects);
      })
      .then(this.getCategories)
      .then(categories => this.fetchSuccess(categories))
      .catch(error => {
        if (error.name !== 'ClientError') {
          error = new ClientError(
            ErrorTypes.JSONError,
            'n/a',
            true,
            error.message,
          );
        }

        error.isCritical = true; // Render error screen since we cannot run the app
        setEventError(error);
      });
  }

  componentDidUpdate() {
    this.scrollSection();
  }

  render = () => {
    const { scrollIDs, categories } = this.state;
    const { setEventError } = this.props;
    const customProps = {
      setEventError,
    };
    return (
      <>
        <section className="flex container">
          <HomeNav selectors={scrollIDs} categories={categories} />
          <HomeGrid categories={categories} {...this.props} />
        </section>

        <Route
          path="/project/:id"
          render={props => <ProjectDetail {...props} {...customProps} />}
        />
      </>
    );
  };

  fetchSuccess = projectsJSON => categoriesJSON => {
    // Sort (by index attribute) & build the nested category structure from flat json
    const categories = [];

    const sortedCatgories = categoriesJSON.sort((a, b) => a.index - b.index);

    const parentsJSON = sortedCatgories.filter(item => item.parentIDs === null);

    parentsJSON.map(itemJSON => {
      const parent = new Category(itemJSON);
      parent.subcategoriesFrom(sortedCatgories);
      categories.push(parent);
      return categories;
    });

    // Assign projects to categories
    categories.forEach(category => {
      category.projectsFrom(projectsJSON);
    });

    let scrollIDs = [];
    categories.forEach(category => {
      scrollIDs.push(category.getElementIDs());
    });

    scrollIDs = scrollIDs.flat(Infinity);

    this.setState({ categories, scrollIDs });
  };

  getProjects = () => this.api.endpoints.project.getAll();

  getCategories = () => this.api.endpoints.category.getAll();

  scrollSection() {
    const { categories } = this.state;
    const { location } = this.props;

    if (!categories || !location) return;

    const hash = location.hash || `${HASH_PREFIX}${categories[0].urlFragment}`;

    scrollToWithRetry(hash);
  }
}

Home.propTypes = {
  categories: PropTypes.array,
  scrollIDs: PropTypes.arrayOf(PropTypes.string),
  location: PropTypes.object,
  setEventError: PropTypes.func,
  history: PropTypes.object,
};

export default withRouter(withAuth(Home));
