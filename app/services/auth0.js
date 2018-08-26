import Service from '@ember/service';
import config from 'ember-js-auth/config/environment';
import { WebAuth } from 'auth0';

export default Service.extend({
  init() {
    this._super(...arguments);
    const webAuth = new WebAuth({
      domain: config.auth0.domain, // domain from auth0
      clientID: config.auth0.clientId, // clientId from auth0
      redirectUri: config.auth0.callbacks.login,
      audience: `https://${config.auth0.domain}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid profile' // adding profile because we want username, given_name, etc
    });
    this.set('webAuth', webAuth);
  }
});
