define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/user-tracks.html'
  ], function($, _, Backbone, tmp) {

  var UserTrackView = Backbone.View.extend({
    tagName: 'li',
    className: 'col-xs-12 artist-track',
    template: _.template(tmp),
    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });

  return UserTrackView;
});

