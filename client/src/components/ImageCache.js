import API from '../util/API';

const urls = new WeakMap();

const blobUrl = blob => {
  if (urls.has(blob)) {
    return urls.get(blob);
  }

  const url = URL.createObjectURL(blob);
  urls.set(blob, url);
  return url;
};

const api = new API({ url: process.env.API_PATH });
api.createEntity({ name: 'image' });
const blobs = new Map();

const ImageCache = id => {
  const existingValue = blobs.get(id);

  if (existingValue !== undefined) {
    return new Promise(existingValue);
  }

  return api.endpoints.image.getOne(id).then(res =>
    res.blob().then(blob => {
      const url = blobUrl(blob);
      blobs.set(id, url);
      return url;
    }),
  );
};

export default ImageCache;
