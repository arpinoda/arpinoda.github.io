import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import HomeNav from './HomeNav';
import Grid from './Grid';
import ProjectDetail from './ProjectDetail';
import withAuth from './withAuth';
import withDataLoader from './withDataLoader';
import { setDefaultHash } from './History';

/**
 * Access-restricted component displaying projects, project details, and categories
 * @param {Object[]} scrollIDs Element ID's used by ScrollSpy
 * @param {Object[]} categories Category models containing projects
 */
const Home = props => {
  const { categories } = props;
  setDefaultHash(categories);

  return (
    <>
      <section className="flex container mx-auto">
        <HomeNav {...props} />
        <Grid {...props} />
      </section>
      <Route
        path="/project/:id"
        render={routeProps => <ProjectDetail {...routeProps} />}
      />
    </>
  );
};

Home.propTypes = {
  categories: PropTypes.array,
  scrollIDs: PropTypes.array,
  location: PropTypes.object,
};

export default withAuth(withDataLoader(Home));
