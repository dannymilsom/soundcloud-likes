define([
  'jquery',
  'underscore',
  'backbone',
  'views/user-track-view'
  ], function($, _, Backbone, UserTrack) {

  var ArtistTracks = Backbone.View.extend({
    el: '#artist-tracks',
    events: {
      "click .artist-track": "playArtistTrack"
    },
    initialize: function(options) {
      _.bindAll(this, "newUserFavorites");
      this.event_agg = options.event_agg;
      options.event_agg.bind("newUserFavorites", this.newUserFavorites);
      this.model.collection.on('sync', this.render, this);
    },
    render: function() {
      this.$el.empty();
      this.model.collection.each(this.addOne, this);
      return this;
    },
    addOne: function(track) {
      var trackView = new UserTrack({ model: track });
      this.$el.append(trackView.render().el);
    },
    playArtistTrack: function(event) {
      var model_id = $(event.currentTarget).children(":first").data("id");
      this.event_agg.trigger("playTrack", this.model.collection.get(model_id));
    },
    newUserFavorites: function(user_id){
      this.model.set({'userID': user_id});
      this.model.collection.url = 'http://api.soundcloud.com/users/' + this.model.get('userID') + '/tracks';
      this.model.collection.fetch({data: {
          client_id: 'e87aac36d9e13fb628046b2725456585',
          format: 'json',
          limit: '40'
        }
      });
    }
  });

  return ArtistTracks;
});

