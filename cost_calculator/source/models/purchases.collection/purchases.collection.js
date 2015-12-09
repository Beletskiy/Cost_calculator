/* global moment, _ */
RAD.model('collection.purchases', Backbone.Collection.extend({
    initialize: function () {
        'use strict';
        var purchases = JSON.parse(localStorage.getItem('purchases'));
        this.add(purchases);
        this.on('add remove', this.setToLocalStorage);
    },

    comparator: function (collection) {
        'use strict';
        return ( collection.get('date') );
    },

    setToLocalStorage: function () {
        'use strict';
        console.log(this);
        localStorage.setItem('purchases', JSON.stringify(this));
    },

    getResultsFromCurrentMonth: function () {
        'use strict';
        var displayedDate = RAD.application.displayedDate;
        var newCol = this.filter(function (data) {
            var dateFromCollection = moment(data.get('date'));
            return dateFromCollection.isSame(displayedDate, 'month');
            //console.log(dateFromCollection.isSame(displayedDate, 'month'));
        });
        return newCol;
    }
}), true);