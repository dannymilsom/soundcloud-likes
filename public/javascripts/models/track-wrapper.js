define(['backbone', 'collections/tracks'], function(Backbone, Tracks) {

  var TrackWrapper = Backbone.Model.extend({
    initialize: function(options) {
      this.userID = options.auth_id;
      this.collection = new Tracks();
      this.collection.url = 'http://api.soundcloud.com/users/' + this.userID + '/favorites';
    },
  });

  return TrackWrapper;
});


