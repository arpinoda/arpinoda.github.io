import { createBrowserHistory } from 'history';
import { HASH_PREFIX } from '../util/UI';

/**
 * Wrapper for History module. Automatically stores previous
 * URL fragment whenever current location changes.
 * https://github.com/ReactTraining/history
 */
const history = createBrowserHistory();
let previous = '';

export const previousFragment = () => previous;

export const unlisten = history.listen(location => {
  const entry = `${location.pathname}${location.search}${location.hash}`;
  previous = entry;
});

export const setDefaultHash = categories => {
  // Sets the hash to first root Category's hash upon page load,
  // only if current path matches root '/' and hash is empty.
  const { hash, pathname } = window.location;
  if (!hash && categories.length > 0 && pathname === '/') {
    const defaultHash = `${HASH_PREFIX}${categories[0].urlFragment}`;
    history.push(defaultHash);
  }
};

export default history;
