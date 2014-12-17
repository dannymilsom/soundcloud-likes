define([
  'backbone'
  ], function(Backbone) {

    var Router = Backbone.Router.extend({
      routes: {
        "/artists/:artist": "artistProfile"
      },
      artistProfile: function(artist) {
        console.log("tried to view artist profile" + artist);
      }
    });

    return Router;
});
