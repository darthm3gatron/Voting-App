define(['ember', 'ember-data'], function(Ember, DS) {
    var App = Ember.Application.create();
    App.ApplicationAdapter = DS.RESTAdapte.extend({
        namespace: 'api/v1'
    });
    return App;
});