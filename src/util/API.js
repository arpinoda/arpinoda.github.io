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
      this.auth.fetch(resourceURL, { params: { query } });

    endpoints.getOne = ({ id }) => this.auth.fetch(`${resourceURL}/${id}`);

    return endpoints;
  }
}

export default API;
