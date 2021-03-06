import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import RSVP, { resolve } from 'rsvp';
import Base from 'ember-simple-auth/authenticators/base';

const { Promise } = RSVP

export default Base.extend({
  ajax: service(),
  session: service('session'),

  restore(data) {
    if (isEmpty(data.token)) {
      return Promise.reject(new Error('No Token to restore found'))
    }
    return Promise.resolve(data);
  },

  authenticate(password, identification) {
    return this.get('ajax').post('/auth/sign_in', {
      data: {
        username: identification,
        password
      }
    }).then(response => {
      return {
        token: response.api_token,
        ldap_uid: response.ldap_uid
      }
    }, (xhr, status, error) => {
      throw xhr.payload
    })
  },

  invalidate(data) {
    return resolve();
  }
});
