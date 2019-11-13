import { createBrowserHistory } from 'history';
import { HASH_PREFIX } from '../util/UI';

/**
 * Wrapper for History package. Automatically stores previous
 * URL fragment every time changes occur within current location
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
  const { hash, pathname } = window.location;
  if (!hash && categories.length > 0 && pathname === '/') {
    const defaultHash = `${HASH_PREFIX}${categories[0].urlFragment}`;
    history.push(defaultHash);
  }
};

export default history;
