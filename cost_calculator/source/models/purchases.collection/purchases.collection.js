/* global moment */
RAD.model('collection.purchases', Backbone.Collection.extend({
    initialize: function () {
        'use strict';
        var purchases = JSON.parse(localStorage.getItem('purchases'));
        //RAD.application.loadCategories();
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
            if (collect[i].attributes.revenue === false) {
                expenses += Number(collect[i].attributes.sum);
            }
        }
        return expenses;
    },

    getCommonRevenuesFromCurrentMonth: function () {
        'use strict';
        var collect = this.getResultsFromCurrentMonth(),
            revenues = 0;
        for (var i = 0; i < collect.length; i++) {
            if (collect[i].attributes.revenue === true) {
                revenues += Number(collect[i].attributes.sum);
            }
        }
        return revenues;
    },

    getArrayOfExpensesFromCurrentMonth: function () {
        'use strict';
        var collect = this.getResultsFromCurrentMonth(),
            expensesArr = [], currentId, categoriesId,
            categories = RAD.model('collection.categories');

        for (var j = 0; j < categories.length; j++) {
            expensesArr[j] = 0;
            categoriesId = categories.models[j].attributes.id;
            for (var i = 0; i < collect.length; i++) {
                if (collect[i].attributes.revenue === false) {
                    currentId = collect[i].attributes.categoryId;
                    if (currentId === categoriesId) {
                        expensesArr[j] += Number(collect[i].attributes.sum);
                    }
                }
            }
        }
        return expensesArr;
    }

}), true);