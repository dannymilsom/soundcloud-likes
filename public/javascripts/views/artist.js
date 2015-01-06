define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/artist-info.html'
  ], function($, _, Backbone, tmp) {

  var ArtistView = Backbone.View.extend({
    el: "#artist-info",
    template: _.template(tmp),
    events: {
      "click #follow-artist": "followArtist"
    },
    initialize: function(options) {
      _.bindAll(this, "newUserFavorites");
      options.event_agg.bind("newUserFavorites", this.newUserFavorites);
      this.model.on('change', this.render, this);
      this.model.on('sync', this.render, this);
      this.model.on('sync', this.updateURL, this);
    },
    render: function() {
      this.$el.empty();
      this.$el.html(this.template(this.model.attributes));
    },
    newUserFavorites: function(user_id) {
      this.model.set({'id': user_id});
      this.model.fetch({
        data: {
          client_id: 'e87aac36d9e13fb628046b2725456585',
          format: 'json',
          limit: '40'
        }
      });
    },
    followArtist: function() {
      SC.put('/me/followings/' + this.model.get('id'));
    },
    updateURL: function() {
      this.goTo('artists/' + this.model.get('permalink'), {trigger: true});
    }
  });

  return ArtistView;

});