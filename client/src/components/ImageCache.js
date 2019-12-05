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
// blobs[key] = [promise, url]

// store key, promise, resolved value

const ImageCache = id => {
  const existingValue = blobs.get(id);

  if (existingValue !== undefined) {
    const promise = existingValue[0];
    const url = existingValue[1];

    if (url) {
      return new Promise(url);
    }

    return promise;
  }

  const promise = api.endpoints.image.getOne(id).then(res =>
    res.blob().then(blob => {
      const url = blobUrl(blob);
      blobs.set(id, [promise, url]);
      return url;
    }),
  );

  blobs.set(id, [promise, null]);
  return promise;
};

export default ImageCache;
