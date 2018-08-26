import RSVP from 'rsvp';
import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';
import config from 'ember-js-auth/config/environment';

export default Base.extend({
  auth0: service(),
  session: service(),
  restore(data) {
    return RSVP.resolve(data);
  },
  authenticate() {
    return new Promise((resolve, reject) => {
      this.get('auth0.webAuth').parseHash((err, authResult) => {
        if (err) reject(err);
        return resolve(authResult);
      });
    });
  },
  invalidate() {
    return new Promise((resolve) => {
      this.get('auth0.webAuth').logout({
        clientID: config.auth0.clientId,
        returnTo: config.auth0.callbacks.logout
      });
      return resolve();
    });
  }
});
