import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  auth0: service(),
  init() {
    this._super(...arguments);
  }
});
