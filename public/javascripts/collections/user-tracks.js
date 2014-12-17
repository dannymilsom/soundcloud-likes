define(['backbone', 'models/user-track'], function(Backbone, UserTrack) {

  var UserTracks = Backbone.Collection.extend({
    model: UserTrack,
  });

  return UserTracks;

});

