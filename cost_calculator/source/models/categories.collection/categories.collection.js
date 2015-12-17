RAD.model('collection.categories', Backbone.Collection.extend({

    getCategoryById: function (id) {
        'use strict';
        if (typeof id === 'number') {
            for (var i = 0; i < this.models.length; i++) {
                if (this.models[i].attributes.id === id) {
                    return this.models[i].attributes.name;
                }
            }
        }
    }
}), true);