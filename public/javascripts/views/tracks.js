define([
  'jquery',
  'underscore',
  'backbone',
  'views/track-view'
  ], function($, _, Backbone, TrackView) {

  var Tracks = Backbone.View.extend({
    el: "#individual-tracks",
    events: {
      "click .explore-favorites": 'fetchFavs',
      "click .play-new-track": "playTrack"
    },
    initialize: function(options) {
      _.bindAll(this, "fetchAuthFavs", "playTrack");
      this.event_agg = options.event_agg;
      options.event_agg.bind("authUserFavs", this.fetchAuthFavs);
      this.model.collection.on("request", this.ajaxStart, this);
      this.model.collection.on("sort", this.render, this);
      this.model.collection.on('sync', this.render, this);
      this.model.collection.on("sync", this.ajaxComplete, this);
    },
    render: function() {
      this.$el.empty();
      this.model.collection.each(this.addOne, this);
      return this;
    },
    addOne: function(track) {
      var trackView = new TrackView({ model: track });
      this.$el.append(trackView.render().el);
    },
    fetchFavs: function(event) {
      var model_id = $(event.currentTarget).parent().data("id");
      var track = this.model.collection.get(model_id);
      var user_id = track.get('user').id;
      this._fetch(user_id);
    },
    fetchAuthFavs: function(user_id) {
      this._fetch(user_id);
    },
    _fetch: function(user_id) {
      // trigger event which updates the user info view
      this.event_agg.trigger("newUserFavorites", user_id);

      // fetch data for new models based on new userid
      this.model.set({'userID': user_id});
      this.model.collection.url = 'http://api.soundcloud.com/users/' +
                                  this.model.get('userID') + '/favorites';
      this.model.collection.fetch({data: {
        client_id: 'e87aac36d9e13fb628046b2725456585',
        format: 'json',
        limit: '40'
        }
      });
    },
    playTrack: function(event) {
      // trigger event which updates the user info view
      var model_id = $(event.currentTarget).parent().data("id");
      this.event_agg.trigger("playTrack", this.model.collection.get(model_id));
    },
    ajaxStart: function(){
      this.$el.empty();
      $(".fa-spin").removeClass("hidden");
    },
    ajaxComplete: function() {
      $(".fa-spin").addClass("hidden");
    },
  });

  return Tracks;
});