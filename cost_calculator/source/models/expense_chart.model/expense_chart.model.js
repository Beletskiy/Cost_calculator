RAD.model('expense_chart.model', Backbone.Model.extend({
    defaults: {
       month: RAD.model('displayedDate.model').attributes.displayedDate.format('MMMM'),
        year: RAD.model('displayedDate.model').attributes.displayedDate.format('YYYY'),
        expenses: RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth(),
        id: [],
        category:[],
        series:[]
    },
    initialize: function () {
        'use strict';
        var arrOfExpenses = RAD.model('collection.purchases').getArrayOfExpensesFromCurrentMonth(),
            categoryModel = RAD.model('collection.categories');
        for (var i = 0, k = 0; i < arrOfExpenses.length; i++) {
            if (arrOfExpenses[i].value !== 0) {
                data.series.push(arrOfExpenses[i].value);
                this.model.add({id: k, category: categoryModel.getCategoryById(arrOfExpenses[i].id)});
                k++;
            }
        }
    }
}), true);