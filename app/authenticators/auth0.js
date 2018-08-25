import Base from 'ember-simple-auth/authenticators/base';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Base.extend({
  auth: service(),
  restore(data) {
    return RSVP.resolve(data);
  },
  authenticate(options) {
    return this.get('auth').login();
  },
  invalidate(data) {
    this.get('auth').logout();
  }
});
