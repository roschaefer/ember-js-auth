import RSVP from 'rsvp';
import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';

export default Base.extend({
  auth: service(),
  restore(data) {
    return RSVP.resolve(data);
  },
  authenticate(token) {
    return RSVP.resolve(token);
  },
  invalidate(data) {
    this.get('auth').logout();
    return RSVP.resolve(data);
  }
});
