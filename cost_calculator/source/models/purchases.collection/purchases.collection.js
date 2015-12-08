RAD.model('collection.purchases', Backbone.Collection.extend({
    initialize: function () {
        'use strict';
        var purchases = JSON.parse(localStorage.getItem('purchases'));
        this.add(purchases);
        this.on('add remove', this.setToLocalStorage());
    },

    comparator: function( collection ){
        'use strict';
        return( collection.get( 'date' ) );
    },

    setToLocalStorage: function () {
        'use strict';
        localStorage.setItem('purchases', JSON.stringify(this));
    }
}), true);