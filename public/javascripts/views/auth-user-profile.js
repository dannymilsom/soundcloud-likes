define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/auth-user.html'
  ], function($, _, Backbone, tmp) {

  var AuthUserProfile = Backbone.View.extend({
    el: '#auth-user-profile',
    template: _.template(tmp),
    events: {
      'click .auth-user': 'viewAuthUserFavs',
    },
    initialize: function(options) {
      this.event_agg = options.event_agg;
      this.model.on('sync', this.render, this);
    },
    render: function() {
      this.$el.html(this.template(this.model.attributes));
    },
    viewAuthUserFavs: function() {
      this.event_agg.trigger("authUserFavs", this.model.get('id'));
    }
  });

  return AuthUserProfile;
});