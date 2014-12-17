define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/sort.html'
  ], function($, _, Backbone, tmp) {

  var SortFilter = Backbone.View.extend({
    el: '#sort-by-filters',
    template: _.template(tmp),
    events: {
      'click #sort-by-total-plays': 'sortByTotalPlays',
      'click #sort-by-upload-date': 'sortByUploadDate',
      'click #sort-by-favorite-count': 'sortByFavoriteCount'
    },
    initialize: function(){
      this.render();
    },
    render: function() {
      this.$el.html(this.template());
    },
    sortByTotalPlays: function() {
      this.model.collection.comparator = function(model) {
        return -model.get('playback_count');
      };
      this.model.collection.sort();
    },
    sortByUploadDate: function() {
      this.model.collection.comparator = function(model) {
        return model.get('created_at');
      };
      this.model.collection.sort();
    },
    sortByFavoriteCount: function() {
      this.model.collection.comparator = function(model) {
        return -model.get('favoritings_count');
      };
      this.model.collection.sort();
    }
  });

    return SortFilter;
});