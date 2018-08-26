import Service from '@ember/service';
import { computed } from '@ember/object';
import config from 'ember-js-auth/config/environment';
import { inject as service } from '@ember/service';

export default Service.extend({
  session: service(),

  /**
   * Configure our auth0 instance
   */
  auth0: computed(function () {
    return new auth0.WebAuth({
      // setting up the config file will be covered below
      domain: config.auth0.domain, // domain from auth0
      clientID: config.auth0.clientId, // clientId from auth0
      redirectUri: config.auth0.callbackUrl,
      audience: `https://${config.auth0.domain}/userinfo`,
      responseType: 'token',
      scope: 'openid profile' // adding profile because we want username, given_name, etc
    });
  }),

  /**
   * Send a user over to the hosted auth0 login page
   */
  login() {
    return this.get('auth0').authorize();
  },

  /**
   * When a user lands back on our application
   * Parse the hash and store user info
   */
  handleAuthentication() {
    return new Promise((resolve) => {
      this.get('auth0').parseHash((err, authResult) => {
        if (err) return false;

        if (authResult && authResult.accessToken) {
          this.setUser(authResult.accessToken);
          this.get('session').authenticate('authenticator:auth0-url-hash', authResult.accessToken);
        }

        return resolve();
      });
    });
  },

  /**
   * Use the token to set our user
   */
  setUser(token) {
    // once we have a token, we are able to go get the users information
    this.get('auth0')
      .client
      .userInfo(token, (err, profile) => {
        this.get('session').set('data.profile', profile);
        return this.set('user', profile)
      })
  },

  /**
   * Get rid of everything in sessionStorage that identifies this user
   */
  logout() {
    return this.get('auth0').logout({
      clientID: config.auth0.clientId,
      returnTo: 'http://localhost:4200'
    });
  }
});
