import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
let previous = '';

export const previousFragment = () => previous;

export const unlisten = history.listen(location => {
  const entry = `${location.pathname}${location.search}${location.hash}`;
  previous = entry;
});

export default history;
