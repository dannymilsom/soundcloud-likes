require.config({
  baseUrl: '/javascripts',
  paths: {
    templates: '../templates',
    text: 'libs/text',
    jquery: 'libs/jquery',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    soundcloud: 'libs/sdk'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: "Backbone"
    }
  }
});

require(['jquery',
        'underscore',
        'backbone',
        'soundcloud',
        'routers/soundcloud-router'
        ], function($, _, Backbone, Soundcloud, Router) {

  SC.initialize({
    client_id: 'e87aac36d9e13fb628046b2725456585',
    redirect_uri: 'http://soundcloud-likes.herokuapp.com/callback.html'
  });

  SC.connect(function() {

    // get authenticated user info via soundcloud JDK
    SC.get('/me', function(auth_user) {

      // add support for a pub/sub design pattern
      var vent = _.extend({}, Backbone.Events);

      // extend the View class with a convenience function to update the URL
      var router = new Router({
        event_agg: vent,
        auth_user: auth_user
      });
      Backbone.View.prototype.goTo = function(uri) {
        router.navigate(uri);
      };

      // start history with HTML5 pushState activated
      if (!Backbone.History.started) {
        Backbone.history.start({pushState: true});
      }
    });

  });
});
