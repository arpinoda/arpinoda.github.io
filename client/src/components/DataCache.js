import API from '../util/API';

class DataCache {
  static api = new API({ url: process.env.API_PATH });

  static data = {};

  static set(key, value) {
    if (DataCache.data[key]) {
      return;
    }
    DataCache.data[key] = value;
  }

  static get(key) {
    return DataCache.data[key];
  }

  static get api() {
    return DataCache.api;
  }
}

class ImageCache extends DataCache {
  constructor(props) {
    super(props);
    ImageCache.api.createEntity({ name: 'image' });
  }

  get = (key, success) => {
    const value = ImageCache.get(key);
    if (value) {
      success(value);
    } else {
      console.log(`Key ${key} not found. Requesting`);

      ImageCache.api.endpoints.image
        .getOne(key)
        .then(res => {
          if (!res.ok) {
            throw Error(res.message);
          }
          return res;
        })
        .then(res => {
          res.blob().then(blob => {
            const url = URL.createObjectURL(blob);
            ImageCache.set(key, url);
            success(url);
            return url;
          });
        });
    }
  };
}

export { ImageCache, DataCache };
