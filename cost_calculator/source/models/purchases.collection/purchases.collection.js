RAD.model('collection.purchases', Backbone.Collection.extend({
    initialize: function () {
        'use strict';
        var purchases = JSON.parse(localStorage.getItem('purchases'));
        this.add(purchases);
        this.on('add remove', this.setToLocalStorage);
        this.sortKey = 'date';
        this.displayedDate = RAD.model('displayedDate.model').attributes.displayedDate;
    },

    //displayedDate: RAD.model('displayedDate.model').attributes.displayedDate,

    comparator: function (collection) {
        'use strict';
        return ( collection.get(this.sortKey) );
    },

    sortByCategory: function() {
        'use strict';
        this.sortKey = 'category';
        this.sort();
    },

    sortBySum: function () {
        'use strict';
        this.sortKey = 'sum';
        this.sort({silent:true});
        this.models = this.models.reverse();
        this.trigger('reset', this, {});
    },

    sortByDate: function () {
        'use strict';
        this.sortKey = 'date';
        this.sort();
    },

    setToLocalStorage: function () {
        'use strict';
        localStorage.setItem('purchases', JSON.stringify(this));
    },

    getResultsFromCurrentMonth: function () {
        'use strict';
        var self = this,
            result = null;

       // displayedDate = RAD.application.displayedDate;
        result = this.filter(function (data) {
            var dateFromCollection = moment(data.get('date'));
            return dateFromCollection.isSame(self.displayedDate, 'month');
        });
        return result;
    },

    getResultsFromPreviousMonth: function (diffInMonth) {
        'use strict';
        var neededDate = {}, result = {},
            currentDate = {};

        currentDate = moment(JSON.parse(JSON.stringify(this.displayedDate)));
        neededDate = currentDate.subtract(diffInMonth, 'months');
        result = this.filter(function (data) {
            var dateFromCollection = moment(data.get('date'));
            return dateFromCollection.isSame(neededDate, 'month');
        });
        return result;
    },

    getCommonExpensesFromPreviousMonth: function (diffInMonth) {
        'use strict';
        if (typeof diffInMonth === 'number') {
            var collect = this.getResultsFromPreviousMonth(diffInMonth),
                expenses = 0;
            for (var i = 0; i < collect.length; i++) {
                if (collect[i].attributes.revenue === false) {
                    expenses += Number(collect[i].attributes.sum);
                }
            }
            return expenses;
        }
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

    getCommonRevenuesFromPreviousMonth: function (diffInMonth) {
        'use strict';
        if (typeof diffInMonth === 'number') {
            var collect = this.getResultsFromPreviousMonth(diffInMonth),
                revenues = 0;
            for (var i = 0; i < collect.length; i++) {
                if (collect[i].attributes.revenue === true) {
                    revenues += Number(collect[i].attributes.sum);
                }
            }
            return revenues;
        }
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
            categoriesId = categories.models[j].attributes.id;
            expensesArr[j] = {id: categoriesId, value: 0};
            for (var i = 0; i < collect.length; i++) {
                if (collect[i].attributes.revenue === false) {
                    currentId = collect[i].attributes.categoryId;
                    if (currentId === categoriesId) {
                        expensesArr[j].value += Number(collect[i].attributes.sum);
                    }
                }
            }
        }
        return expensesArr;
    },

    getArrayOfRevenuesFromCurrentMonth: function () {
        'use strict';
        var collect = this.getResultsFromCurrentMonth(),
            revenuesArr = [], currentId, categoriesId,
            categories = RAD.model('collection.categories');

        for (var j = 0; j < categories.length; j++) {
            categoriesId = categories.models[j].attributes.id;
            revenuesArr[j] = {id: categoriesId, value: 0};
            for (var i = 0; i < collect.length; i++) {
                if (collect[i].attributes.revenue === true) {
                    currentId = collect[i].attributes.categoryId;
                    if (currentId === categoriesId) {
                        revenuesArr[j].value += Number(collect[i].attributes.sum);
                    }
                }
            }
        }
        return revenuesArr;
    }

}), true);