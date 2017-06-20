import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  router: Ember.inject.service(),
  session: Ember.inject.service(),

  downloadFile(url) {
    let xhr = new XMLHttpRequest;
    xhr.responseType = 'blob';
    xhr.onload = () => {
      let [ , fileName ] = /filename="(.*?)"/.exec(xhr.getResponseHeader('Content-Disposition'));
      let file = new File([ xhr.response ], fileName);
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    xhr.open('GET', url);
    xhr.setRequestHeader('api-token', this.get('session.data.authenticated.token'));
    xhr.setRequestHeader('ldap-uid', this.get('session.data.authenticated.ldap_uid'));
    xhr.send();
  },

  actions: {
    exportCvOdt(personId, e) {
      e.preventDefault();
      let url = `/api/people/${personId}.odt`;
      this.downloadFile(url)
    },

    exportDevFws(personId, e) {
      e.preventDefault();
      let url = `/api/people/${personId}/fws.odt?discipline=development`;
      this.downloadFile(url)
    },

    exportSysFws(personId, e) {
      e.preventDefault();
      let url = `/api/people/${personId}/fws.odt?discipline=system_engineering`;
      this.downloadFile(url)
    },

    exportEmptyDevFws(personId, e) {
      e.preventDefault();
      let url = `/api/people/fws.odt?empty=true&discipline=development`;
      this.downloadFile(url)
    },

    exportEmptySysFws(personId, e) {
      e.preventDefault();
      let url = `/api/people/fws.odt?empty=true&discipline=system_engineering`;
      this.downloadFile(url)
    },

    loadPersonVariations(originPersonId, id = originPersonId) {
      id = originPersonId || id;
      return this.get('ajax')
       .request(`people/${id}/variations`)
        .then(response => response.data)
        .then(personVariations => this.set('personVariations', personVariations));
    },

    createPersonVariation(id, changeset) {
      return this.get('ajax')
       .request(`people/${id}/variation`, {
         method: 'POST',
         data: {
           variation_name: changeset.get('variationName')
         }
       })
        .then(response => response.data)
        .then(personVariation => this.get('router').transitionTo('person', personVariation.id))
        .then(
            function(value) { this.get('notify').success('Variante erstellt!') }.bind(this),
            function(reason) { this.get('notify').alert(reason.payload, { closeAfter: 15000 }) }.bind(this)
         );
    },

    updateVariationName(changeset) {
      return changeset.save();
    },

    deletePerson(personToDelete) {
      personToDelete.destroyRecord().then(() => {
        this.toggleProperty('deletePersonConfirm');
        if (personToDelete.get('variationName')) {
          this.get('router').transitionTo('person', personToDelete.get('originPersonId'))
            .then(() => this.get('notify').success('Variante entfernt!'));

        }
        else {
          this.get('router').transitionTo('people')
            .then(() => this.sendAction('onDelete'))
            .then(() => this.get('notify').success('Person gelöscht!'));
        }
      });
    }
  }
});
