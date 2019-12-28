import decode from 'jwt-decode';
import { ClientError } from '../../../server/errors';

/**
 * Authentication helper methods used by the React.js app
 * Adapted via https://medium.com/@romanchvalbo
 */
export default class AUTH {
  constructor(baseUrl) {
    this.baseURL = baseUrl || '';
    this.STORAGE_KEY = 'id_token';
  }

  login = passcode =>
    // Make HTTP request to authenticate user
    this.fetch(`${this.baseURL}login`, {
      method: 'POST',
      body: JSON.stringify({
        passcode,
      }),
    })
      .then(res => res.json())
      .then(loginResult => {
        if (loginResult.token !== null) {
          this.setToken(loginResult.token);
        }
        return loginResult;
      });

  loggedIn = () => {
    // Checks if there is a saved valid token
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  };

  isTokenExpired = token => {
    // Returns whether token is still valid
    try {
      const decoded = decode(token);
      const isExpired = decoded.exp < Date.now() / 1000;
      return isExpired;
    } catch (err) {
      const error = new ClientError(err);
      error.send();
      return true;
    }
  };

  // Stores token within LocalStorage
  setToken = idToken => localStorage.setItem(this.STORAGE_KEY, idToken);

  // Gets token from LocalStorage
  getToken = () => localStorage.getItem(this.STORAGE_KEY);

  // Removes token from LocalStorage
  logout = () => localStorage.removeItem(this.STORAGE_KEY);

  // Decodes the token using jwt-decode module
  decodeToken = () => decode(this.getToken());

  /**
   * Wrapper function that sets an Authorization Header, if token is available
   * @param {string} url The path for the resource
   * @param {Object} options Additional customizations
   */
  fetch = (url, options) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    // Setting Authorization header, e.g. Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers.Authorization = `Bearer ${this.getToken()}`;
    }

    // If erroneous, create and throw ClientError to be caught by higher-level .catch() methods
    return fetch(url, {
      headers,
      ...options,
    })
      .then(res => {
        if (!res.ok) {
          const message = `${res.status} ${res.statusText} - ${url}`;
          const error = new ClientError(message);
          error.statusCode = res.status;
          error.send();
          if (res.statusText === 'Unauthorized') {
            this.logout();
          }
          throw error;
        }
        return res;
      })
      .then(res => res);
  };
}
