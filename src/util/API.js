class API {
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
      fetch(resourceURL, { params: { query } });
    endpoints.getOne = ({ id }) => fetch(`${resourceURL}/${id}`);

    return endpoints;
  }
}

export default API;
