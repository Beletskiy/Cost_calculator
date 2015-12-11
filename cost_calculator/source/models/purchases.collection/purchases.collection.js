/* global moment, _ */
RAD.model('collection.purchases', Backbone.Collection.extend({
    initialize: function () {
        'use strict';
        var purchases = JSON.parse(localStorage.getItem('purchases'));
       // RAD.application.loadCategories();
        this.add(purchases);
        this.on('add remove', this.setToLocalStorage);
    },

    comparator: function (collection) {
        'use strict';
        return ( collection.get('date') );
    },

    setToLocalStorage: function () {
        'use strict';
        localStorage.setItem('purchases', JSON.stringify(this));
    },

    getResultsFromCurrentMonth: function () {
        'use strict';
        var displayedDate = RAD.application.displayedDate,
            result = this.filter(function (data) {
                var dateFromCollection = moment(data.get('date'));
                return dateFromCollection.isSame(displayedDate, 'month');
            });
        return result;
    },

    getCommonExpensesFromCurrentMonth: function () {
        'use strict';
        var collect = this.getResultsFromCurrentMonth(),
            expenses = 0;
        for (var i = 0; i < collect.length; i++) {
            expenses += Number(collect[i].attributes.sum);
        }
        return expenses;
    },

    getArrayOfExpensesFromCurrentMonth: function () {
        'use strict';
        var collect = this.getResultsFromCurrentMonth(),
            expensesArr = [];
        var categories = RAD.model('collection.categories');
        //console.log(categories);
        categories.forEach(function (data) {
           console.log(data.attributes.id);
        });
        for (var i = 0; i < collect.length; i++) {
            expensesArr.push(Number(collect[i].attributes.sum));
        }
        return expensesArr;
    }
}), true);