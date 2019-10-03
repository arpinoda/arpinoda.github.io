import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Category from '../models/Category';
import API from '../util/API';
import AUTH from '../util/AUTH';

class App extends React.Component {
  Auth = new AUTH();

  constructor(props) {
    super(props);

    this.state = {
      categories: null,
      scrollIDs: null,
    };
    this.api = new API({
      url: API_URL,
    });

    this.api.createEntities([{ name: 'project' }, { name: 'category' }]);

    // Force WebPack to include all imagery within 'static' directory
    this.importAll(require.context('../static', true, /^\.\//));
  }

  componentDidMount() {
    if (!this.Auth.loggedIn()) {
      return;
    }
    this.getProjects()
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return this.throwResponseError(res);
      })
      .then(json => {
        this.fetchSuccess = this.fetchSuccess(json);
      })
      .then(this.getCategories)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return this.throwResponseError(res);
      })
      .then(json => {
        this.fetchSuccess(json);
      })
      .catch(error => {
        console.log(error);
        // TODO: Logging
      });
  }

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

  throwResponseError = res => {
    throw new Error(
      `Something went wrong. HTTP: ${res.status}, ${res.statusText}`,
    );
  };

  getProjects = () => this.api.endpoints.project.getAll();

  getCategories = () => this.api.endpoints.category.getAll();

  importAll = r => r.keys().map(r);

  render() {
    const { categories, scrollIDs } = this.state;
    return (
      <BrowserRouter>
        <Route
          path="/"
          render={props => (
            <Home
              location={props.location}
              scrollIDs={scrollIDs}
              categories={categories}
            />
          )}
        />
        <Route path="/login" render={props => <Login {...props} />} />
      </BrowserRouter>
    );
  }
}

export default App;
