import AUTH from './AUTH';

class API {
  constructor({ url }) {
    this.url = url;
    this.endpoints = {};
    this.auth = new AUTH(url);
  }

  createEntity(entity) {
    this.endpoints[entity.name] = this.createCRUDEndpoints(entity);
  }

  createEntities(entityArray) {
    entityArray.forEach(this.createEntity.bind(this));
  }

  createCRUDEndpoints({ name }) {
    const endpoints = {};
    const resourceURL = `${this.url}/${name}`;

    endpoints.getAll = ({ query } = {}) =>
      this.authenticatedFetch(resourceURL, { params: { query } });

    endpoints.getOne = id => this.authenticatedFetch(`${resourceURL}/${id}`);

    return endpoints;
  }

  authenticatedFetch = (url, options) =>
    this.auth
      .fetch(url, options)
      .then(res => res.json())
      .catch(err => {
        if (err.message === 'Unauthorized') {
          this.auth.logout();
          return window.location.reload();
        }
        throw err;
      });
}

export default API;
