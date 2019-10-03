import AUTH from './AUTH';

class API {
  Auth = new AUTH();

  constructor({ url }) {
    this.url = url;
    this.endpoints = {};
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
      this.Auth.fetch(resourceURL, { params: { query } });

    endpoints.getOne = ({ id }) => this.Auth.fetch(`${resourceURL}/${id}`);

    return endpoints;
  }
}

export default API;
