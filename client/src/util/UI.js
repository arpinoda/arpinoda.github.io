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
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxOSAxNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHRpdGxlPlNoYXBlPC90aXRsZT4KPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CjxnIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0ibm9uemVybyI+CjxwYXRoIGQ9Im0xMi41OSAwLjYxMjk2Yy0wLjI1NDcyLTAuMjcwMjYtMC42Nzg2Ni0wLjI3MDI2LTAuOTQyMjggMC0wLjI1NDcyIDAuMjYxMTMtMC4yNTQ3MiAwLjY5NTc0IDAgMC45NTYyNmw0Ljc3NzkgNC44OTgyaC0xNS43NjZjLTAuMzY3NTMgNi4wODdlLTQgLTAuNjU5NjYgMC4zMDAwOS0wLjY1OTY2IDAuNjc2ODdzMC4yOTIxMiAwLjY4NiAwLjY1OTY2IDAuNjg2aDE1Ljc2NmwtNC43Nzc5IDQuODg5Yy0wLjI1NDcyIDAuMjcwMjYtMC4yNTQ3MiAwLjcwNTQ4IDAgMC45NjYgMC4yNjM2MiAwLjI3MDI2IDAuNjg4MTYgMC4yNzAyNiAwLjk0MjI4IDBsNS45MDktNi4wNTc3YzAuMjYzNjItMC4yNjExMyAwLjI2MzYyLTAuNjk1NzQgMC0wLjk1NjI2bC01LjkwOS02LjA1ODN6Ii8+CjwvZz4KPC9nPgo8L3N2Zz4K';

// The broken image, displayed when on image load error
export const BROKEN_IMAGE =
  'data:image/jpeg;base64,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';

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
