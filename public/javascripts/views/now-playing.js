define([
  'jquery',
  'underscore',
  'backbone',
  'soundcloud',
  'text!templates/audio-player.html'
  ], function($, _, Backbone, Soundcloud, tmp) {

  var NowPlayingView = Backbone.View.extend({
    el: "#player-banner",
    template: _.template(tmp),
    events: {
      "click #play-controller": 'togglePlayControler',
      "click #add-to-favs": "addToFavorites"
    },
    initialize: function(options) {
      _.bindAll(this, "playTrack", "movePlayhead", "updateDuration");
      options.event_agg.bind("playTrack", this.playTrack);
      this.render();
      this.duration = 0;
      this.trackName = this.$("#track-playing");
      this.artistName = this.$("#artist-playing");
      this.musicPlayer = this.$(".music-player");
      this.musicPlayer.on("timeupdate", this.movePlayhead);
      this.musicPlayer.on("canplaythrough", this.updateDuration);
    },
    render: function() {
      this.$el.html(this.template);
    },
    togglePlayControler: function() {
      var musicPlayer = this.$(".music-player");
      var audio = this.$el.find(".music-player")[0];
      $("#play-controller").toggleClass("fa-play-circle-o fa-pause");
      if ($(audio)[0].paused) {
        musicPlayer.trigger("play");
      } else { musicPlayer.trigger("pause"); }
    },
    playTrack: function(track) {
      var musicPlayer = this.$(".music-player");
      var playController = this.$("#play-controller");
      this.model = track;
      SC.stream("/tracks/" + track.id, function(sound){
        musicPlayer.attr("src", sound.url).trigger("play");
        playController.toggleClass("fa-play-circle-o fa-pause");
      });
      this.trackName.text(track.get('title'));
      this.artistName.text(track.get('user').username);
    },
    addToFavorites: function() {
      SC.put('/me/favorites/' + this.model.get('id'));
    },
    movePlayhead: function() {
      var playPercent = 100 * (this.$(".music-player")[0].currentTime / this.duration);
      this.$("#playhead")[0].style.marginLeft = playPercent + "%";
    },
    updateDuration: function() {
      this.duration = this.$(".music-player")[0].duration;
    }
  });

  return NowPlayingView;
});