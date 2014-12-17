define(['backbone', 'collections/user-tracks'], function(Backbone, UserTracks) {

  var ArtistTrackWrapper = Backbone.Model.extend({
    initialize: function(options) {
      this.userID = options.auth_id;
      this.collection = new UserTracks();
      this.collection.url = 'http://api.soundcloud.com/users/' + this.userID + '/tracks';
    },
  });

  return ArtistTrackWrapper;
});
