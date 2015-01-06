define([
  'backbone',
  'views/parent',
  ], function(Backbone, ParentView) {
    var Router = Backbone.Router.extend({
      routes: {
        "": "default", // renders the authenticated users profile
        "artists/:artist": "artistProfile" // renders another user profile
      },
      initialize: function(options){
        this.event_agg = options.event_agg;
        this.auth_user = options.auth_user;
      },
      default: function(){
        this.initParent(this.auth_user);
      },
      artistProfile: function(artist) {
        // find the artist id via permalink
        var router = this;
        $.ajax({
          type: 'GET',
          url: 'http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/' +
                artist + '&client_id=e87aac36d9e13fb628046b2725456585'
        }).done(function(data){
          router.initParent(data);
        });
      },
      initParent: function(userData) {
        this.parentView = new ParentView({
          event_agg: this.event_agg,
          auth_user: this.auth_user,
          display_user: userData
        });
      }
    });

    return Router;
});
