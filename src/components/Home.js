import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomeNav from './HomeNav';
import HomeGrid from './HomeGrid';
import ProjectDetail from './ProjectDetail';
import withAuth from './withAuth';
import { scrollToWithRetry, HASH_PREFIX } from '../util/UI';

class Home extends React.Component {
  componentDidMount() {}

  componentDidUpdate() {
    this.scrollSection();
  }

  scrollSection() {
    const { categories } = this.props;

    if (!categories) return;

    const { location } = this.props;

    const hash = location.hash || `${HASH_PREFIX}${categories[0].urlFragment}`;

    scrollToWithRetry(hash);
  }

  render = () => {
    const { scrollIDs, categories } = this.props;

    return (
      <>
        <section className="flex container">
          <HomeNav selectors={scrollIDs} categories={categories} />
          <HomeGrid categories={categories} {...this.props} />
        </section>

        <Route
          path="/project/:id"
          render={props => <ProjectDetail {...props} />}
        />
      </>
    );
  };
}

Home.propTypes = {
  categories: PropTypes.array,
  scrollIDs: PropTypes.arrayOf(PropTypes.string),
  location: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(withAuth(Home));
