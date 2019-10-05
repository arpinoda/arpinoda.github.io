import decode from 'jwt-decode';

// adapted via
// https://medium.com/@romanchvalbo/how-i-set-up-react-and-node-with-json-web-token-for-authentication-259ec1a90352

export default class AUTH {
  constructor(baseUrl) {
    this.baseURL = baseUrl || '';
    this.storageKey = 'id_token';
  }

  login = passcode =>
    this.fetch(`${this.baseURL}login`, {
      method: 'POST',
      body: JSON.stringify({
        passcode,
      }),
    }).then(loginResult => {
      if (loginResult.token !== null) {
        this.setToken(loginResult.token);
      }
      return loginResult;
    });

  loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  };

  isTokenExpired = token => {
    try {
      const decoded = decode(token);
      const isExpired = decoded.exp < Date.now() / 1000;
      return isExpired;
    } catch (err) {
      return true;
    }
  };

  setToken = idToken => localStorage.setItem(this.storageKey, idToken);

  getToken = () => localStorage.getItem(this.storageKey);

  logout = () => localStorage.removeItem(this.storageKey);

  decodeToken = () => decode(this.getToken());

  fetch = (url, options) => {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers.Authorization = `Bearer ${this.getToken()}`;
    }

    return fetch(url, {
      headers,
      ...options,
    }).then(response => response.json());
  };
}
