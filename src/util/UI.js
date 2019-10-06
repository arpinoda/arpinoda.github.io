export const LOADING_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADIBAMAAACg8cFmAAAAG1BMVEXu7u7////w8PDy8vL6+vr29vb09PT8/Pz4+Ph2TYMOAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACmElEQVR4nO3XTVPaQACA4RgQcuwKCMdFqV6l2qlH6IUr6VTtEaGlHo2jxSPRTv3b3d1sQsuHDDMk6UzfZxhcNhHeyRfBcQAAAAAAAAAAAAAAAAAAAAAAAAAA/y/35LWlh2vXSElx77Wl3bVrpISsTazPKgyy6JizPisXZG3CZr2/GEavjy7syP12KU2WuW4VpFoytGuMHFdmkuWLiXjSCS9CMaOwHlRlcia2By0RiL4atcR98KN4m0VWqyGdt3W1VQqPaoucV9XUcU06Z5VZ1kgtPqupNeoDx/V/ZpLV1fvp+C6eC0/sVBgkWf5UPauXZb1WQWSRVarpUaERzzX7dsoTSZbegs71QD8UP4us4hsz7Eo7tzO1h5w7y9qzvdG52cwiqzk1w2hD6KyOfpjSJGtqe3tmvpxFVrtvhtEf93R83YlL/zgTbW8vDk8/y24mk/JViHrQiUvnssodJ5TJqmln+dGNnt4ErerQDKKMJVlRb5j2reHfWe7kxHk9y9OnqNdY9lbbzprtRK9i+1buxJJ4GN8E0yyyZoe8+lzdt+qQV4ubT58n95/SrjIfas8rtS+jGnUm2ivA7CofZ11n84PDXE6ju4hJfIZ11SE0fzmNs9pJ1pFUKwyXDraTFX3t6O+bHb2RdtUFwjVTxcWscmN0EP1nqKa8/aWD7WQ5oT642rf2Tf0PHfWkptze4rFlbn0eB5lkedXhwXldqpDg+fBqXx/4eurqLlzIUj9pT8cvVZlFlrm2m9OxJURDmk//LsSDsyxL8zspZ1mHIxkPkql3q1f38vjtuF5pq9tkawr/ZtZuJe+CpVK/O93UL/1UCmTOGfPC6uX4S/Ax74x57k0g6s95VwAAAAAAAAAAAAAAAAAAAAD5+Q25THgtQ4raGgAAAABJRU5ErkJggg==';
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

export const readResponseImage = res => {
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

export default scrollToWithRetry;
