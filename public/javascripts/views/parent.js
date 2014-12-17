define([
  'jquery',
  'underscore',
  'backbone',
  'models/user',
  'models/artist-track-wrapper',
  'models/track-wrapper',
  'views/now-playing',
  'views/artist',
  'views/auth-user-profile',
  'views/artist-tracks',
  'views/tracks',
  'views/sort-filter',
  'text!templates/parent.html'
  ], function($, _, Backbone, //libs
              User, ArtistTrackWrapper, TrackWrapper, // models
              NowPlaying, Artist, AuthProfile, //views
              ArtistTracks, Tracks, SortFilter, tmp) {

  var ParentView = Backbone.View.extend({
    el: '.container',
    template: _.template(tmp),
    initialize: function(options) {

      this.render();
      this.fetch_params = {
        client_id: 'e87aac36d9e13fb628046b2725456585',
        format: 'json',
        limit: '42'
      };

      // create the models we need to pass to child views

      var artistTracks = new ArtistTrackWrapper({auth_id: options.auth_id});
      artistTracks.collection.fetch({
        data: this.fetch_params
      });

      var tracks = new TrackWrapper({auth_id: options.auth_id});
      tracks.collection.fetch({
        data: this.fetch_params
      });

      var authUser = new User({'id': options.auth_id});
      authUser.fetch({
        data: this.fetch_params
      });

      var currentUser = new User({'id': options.auth_id});
      currentUser.fetch({
        data: this.fetch_params
      });

      // initalize the child views

      this.artistTrackView = new ArtistTracks({
        event_agg: options.event_agg,
        model: artistTracks
      });

      this.trackView = new Tracks({
        event_agg: options.event_agg,
        model: tracks
      });

      this.nowPlayingView = new NowPlaying(options);

      this.trackSort = new SortFilter({model: tracks});

      this.artistView = new Artist($.extend(options, {
        model: currentUser
      }));

      this.authUserProfile = new AuthProfile($.extend(options, {
        model: authUser
      }));

    },
    render: function() {
      this.$el.html(this.template());
    }
  });

    return ParentView;
});