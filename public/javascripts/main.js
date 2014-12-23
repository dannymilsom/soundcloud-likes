require.config({
  baseUrl: 'javascripts',
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
        'views/parent',
        ], function($, _, Backbone, Soundcloud, ParentView) {

  SC.initialize({
    client_id: 'e87aac36d9e13fb628046b2725456585',
    redirect_uri: 'http://soundcloud-likes.herokuapp.com/callback.html'
  });

  SC.connect(function() {
    // add support for a pub/sub design pattern
    var vent = _.extend({}, Backbone.Events);

    // get authenticated user info via soundcloud JDK
    SC.get('/me', function(auth_user) {
      var parentView = new ParentView({
        event_agg: vent,
        auth_id: auth_user.id
      });
    });

  });
});
