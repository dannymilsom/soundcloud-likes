define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/album-art.html'
  ], function($, _, Backbone, tmp) {

  var TrackView = Backbone.View.extend({
    tagName: 'li',
    className: 'col-xs-4 col-sm-3 col-lg-2',
    template: _.template(tmp),
    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });

  return TrackView;
});

