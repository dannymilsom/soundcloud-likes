define(['backbone'], function(Backbone) {

  var User = Backbone.Model.extend({
    urlRoot: 'http://api.soundcloud.com/users/'
  });

  return User;
});
