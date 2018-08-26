import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  router: service(),
  session: service(),
  auth0: service(),
  actions: {
    login() {
      this.get('auth0.webAuth').authorize();
    },

    logout() {
      this.get('session').invalidate()
    }
  }
});
