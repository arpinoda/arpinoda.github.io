/**
 * Various UI utility functions and constants
 */

/**
 * A gray rectangle image placeholder. Sent as base64 so project img elements
 * are populated when ScrollSpy is initialized.
 */
export const LOADING_IMAGE =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBARXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAABLKADAAQAAAABAAAAyAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAyAEsAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAwMDAwMDBgMDBggGBgYICwgICAgLDgsLCwsLDhEODg4ODg4RERERERERERUVFRUVFRgYGBgYGxsbGxsbGxsbG//bAEMBBAQEBwYHDAYGDB0TEBMdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHf/dAAQAE//aAAwDAQACEQMRAD8A/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Q/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//R/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//S/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//T/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//U/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//V/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//W/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//X/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Q/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//R/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//S/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//T/TiiiisygooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z';

// The right arrow, displayed within input on login screen
export const ARROW_RIGHT_IMAGE =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMzEuNDkgMzEuNDkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMxLjQ5IDMxLjQ5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBzdHlsZT0iZmlsbDojMUUyMDFEOyIgZD0iTTIxLjIwNSw1LjAwN2MtMC40MjktMC40NDQtMS4xNDMtMC40NDQtMS41ODcsMGMtMC40MjksMC40MjktMC40MjksMS4xNDMsMCwxLjU3MWw4LjA0Nyw4LjA0N0gxLjExMQ0KCUMwLjQ5MiwxNC42MjYsMCwxNS4xMTgsMCwxNS43MzdjMCwwLjYxOSwwLjQ5MiwxLjEyNywxLjExMSwxLjEyN2gyNi41NTRsLTguMDQ3LDguMDMyYy0wLjQyOSwwLjQ0NC0wLjQyOSwxLjE1OSwwLDEuNTg3DQoJYzAuNDQ0LDAuNDQ0LDEuMTU5LDAuNDQ0LDEuNTg3LDBsOS45NTItOS45NTJjMC40NDQtMC40MjksMC40NDQtMS4xNDMsMC0xLjU3MUwyMS4yMDUsNS4wMDd6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==';

// The hash string used within URLs
export const HASH_PREFIX = '#';

/**
 * Sets a container's scrollY to a specific value, then "disables" scrolling for the container.
 * Body element may still scroll if child elements overflow.
 * @param {number} value The scrollY value for which the container should lock scrolling at.
 */
export const disableScrollAt = value => {
  const $container = document.querySelector('.container');
  if (!$container) return null;

  let scrollY = 0;
  if (value) {
    scrollY = value;
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

// Enables scrolling of a 'disabled' container element.
export const enableScroll = () => {
  const $container = document.querySelector('.container');
  if (!$container) return;

  let { top } = $container.style;
  top = parseInt(top.replace('px', ''), 10);

  $container.style.position = '';
  $container.style.top = '';
  $container.style.overflow = '';
  document.scrollingElement.scrollTop = -1 * top;
};

/**
 * Reads an image from a readable stream, then creates and returns URL for BLOB object
 * @param {Object} res HTTP Fetch Response
 * @param {errorCallback} onError A callback function triggered if an error occurs
 */
export const createBlobURL = (res, onError) => {
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
    .catch(err => {
      onError(err);
    });
};

/**
 * Parses an href for querystring 'next'. Returns a string path
 * @param {Object} location - The location attribute obtained from global window object.
 */
export const nextPathFromHref = location => {
  let redirectTo = '/';
  const nextKeyword = 'next=';

  if (location.indexOf(nextKeyword) > 0) {
    const index = location.indexOf(nextKeyword) + nextKeyword.length;
    redirectTo = location.substring(index);
  }

  return redirectTo;
};

// Returns the file extension for an input string filename.
export const getFileExtension = filename => filename.split('.').pop();

// Converts dash-separated string to camelCase.
export const camelize = string =>
  string.replace(/-([a-z])/gi, (s, group) => group.toUpperCase());

// Converts "react css syntax" string to "valid css syntax" object
export const styleToObject = style =>
  style
    .split(';')
    .filter(s => s.length)
    .reduce((a, b) => {
      const keyValue = b.split(':');
      const cleansedKey = keyValue[0].trim();
      const cleansedValue = keyValue[1].trim();
      a[camelize(cleansedKey)] = cleansedValue;
      return a;
    }, {});
