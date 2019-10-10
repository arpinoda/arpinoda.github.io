import API from './API';

export const LOADING_IMAGE =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBARXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAABLKADAAQAAAABAAAAyAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAyAEsAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAwMDAwMDBgMDBggGBgYICwgICAgLDgsLCwsLDhEODg4ODg4RERERERERERUVFRUVFRgYGBgYGxsbGxsbGxsbG//bAEMBBAQEBwYHDAYGDB0TEBMdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHf/dAAQAE//aAAwDAQACEQMRAD8A/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Q/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//R/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//S/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//T/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//U/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//V/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//W/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//X/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Q/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//R/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//S/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//T/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z';
export const HASH_PREFIX = '#';
export const ACTIVE_SCROLL_OFFSET = 150;

/* TODO: possibly refactor to avoid retries,
  since we're loading locally.
  Snippet via: https://stackoverflow.com/a/48195222 */
export const scrollToWithRetry = hash => {
  if (typeof hash !== 'string') {
    ({ hash } = window.location);
  }

  if (hash !== '') {
    let retries = 0;
    const id = hash.replace('#', '');
    const scroll = () => {
      if (retries > 50) return;
      retries += 1;

      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView();
          window.scrollBy(0, 1);
        }, 0);
      } else {
        setTimeout(scroll, 100);
      }
    };

    scroll();
  }
};

export const lockScroll = val => {
  const $container = document.querySelector('.container');
  if (!$container) return null;

  let scrollY = 0;
  if (val) {
    scrollY = val;
  } else {
    ({ scrollY } = window);
  }

  $container.style.top = `-${scrollY}px`;
  $container.style.position = 'fixed';
  $container.style.left = '0px';
  $container.style.right = '0px';
  $container.style.overflow = 'scroll';

  return scrollY;
};

export const unlockScroll = () => {
  const $container = document.querySelector('.container');
  if (!$container) return;

  let { top } = $container.style;
  top = parseInt(top.replace('px', ''), 10);

  $container.style.position = '';
  $container.style.top = '';
  $container.style.overflow = '';
  document.scrollingElement.scrollTop = -1 * top;
};

export const createBlobURL = res => {
  const reader = res.body.getReader();
  return new Promise(resolve => {
    const stream = new ReadableStream({
      start(controller) {
        function pump() {
          return reader.read().then(({ done, value }) => {
            // When no more data needs to be consumed, close the stream
            if (done) {
              controller.close();
              return;
            }
            // Enqueue the next data chunk into our target stream
            controller.enqueue(value);
            pump();
          });
        }
        return pump();
      },
    });
    resolve(stream);
  })
    .then(stream => new Response(stream))
    .then(response => response.blob())
    .then(blob => URL.createObjectURL(blob))
    .then(url => url)
    .catch(err => console.error(err));
};

export const fetchImage = imageURL => {
  const api = new API({
    url: process.env.API_PATH,
  });

  api.createEntities([{ name: 'image' }]);

  const result = api.endpoints.image
    .getOne(imageURL)
    .then(res => createBlobURL(res))
    .then(url => url);

  return result;
};

export const getFileExtension = filename => filename.split('.').pop();

export default scrollToWithRetry;
