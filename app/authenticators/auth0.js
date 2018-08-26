import Base from 'ember-simple-auth/authenticators/base';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Base.extend({
  auth: service(),
  restore(data) {
    return RSVP.resolve(data);
  },
  authenticate(options) {
    return this.get('auth').login();
  }
});
