import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Route.extend({
  session: service(),
  beforeModel() {
    // check if we are authenticated
    // parse the url hash that comes back from auth0
    // if authenticated on login, redirect to the dashboard
    get(this, 'session')
      .authenticate('authenticator:auth0')
      .then(() => this.transitionTo('/dashboard'));
  },
});
