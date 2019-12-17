import API from '../util/API';

// Collection of blob URLs with blob object as key
const blobCache = new WeakMap();

// Collection of resolved or pending promise along with resolved value
// e.g. networkCache[key] = [promise, url]
const networkCache = new Map();

const api = new API({ url: process.env.API_PATH });
api.createEntities([
  { name: 'project' },
  { name: 'category' },
  { name: 'image' },
]);

const blobUrl = blob => {
  if (blobCache.has(blob)) {
    return blobCache.get(blob);
  }

  const url = URL.createObjectURL(blob);
  blobCache.set(blob, url);
  return url;
};

const ImageCache = id => {
  const existingValue = networkCache.get(id);

  if (existingValue !== undefined) {
    const promise = existingValue[0];
    const url = existingValue[1];

    if (url) {
      return Promise.resolve(url);
    }

    return promise;
  }

  const promise = api.endpoints.image.getOne(id).then(res =>
    res.blob().then(blob => {
      const url = blobUrl(blob);
      networkCache.set(id, [promise, url]);
      return url;
    }),
  );

  networkCache.set(id, [promise, null]);
  return promise;
};

export {
  ImageCache, // eslint-disable-line
};
