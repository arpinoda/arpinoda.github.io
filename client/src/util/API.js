import AUTH from './AUTH';
import { ClientError, ErrorTypes } from '../models/Logging';

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
      this.authenticatedFetch(resourceURL, { params: { query } }).then(res =>
        res.json(),
      );

    endpoints.getOne = id => this.authenticatedFetch(`${resourceURL}/${id}`);

    return endpoints;
  }

  authenticatedFetch = (url, options) =>
    this.auth.fetch(url, options).then(res => {
      if (res.status === 401) {
        this.auth.logout();
        window.location.reload();
      } else if (res.status > 399) {
        throw new ClientError(
          ErrorTypes.HttpError,
          `URL: ${url}`,
          false,
          res.statusText,
        );
      }
      return res;
    });
}

export default API;
