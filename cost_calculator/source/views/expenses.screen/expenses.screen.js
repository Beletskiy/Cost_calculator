/*global moment*/
RAD.view('expenses.screen', RAD.Blanks.ScrollableView.extend({

    url: 'source/views/expenses.screen/expenses.screen.html',

    headerInfo: {
        month: null,
        year: null,
        expenses: null
    },

    events: {
        'tap #chart': 'showChartExpenses',
        'tap #month-minus': 'previousMonth',
        'tap #month-plus': 'nextMonth'
    },

    onInitialize: function () {
        'use strict';
       // this.listenTo(RAD.model('collection.purchases'), 'add', this.render());
    },

    onNewExtras: function () {
        'use strict';

        var collect = RAD.model('collection.purchases').getResultsFromCurrentMonth();

        //this.listenTo(RAD.model('collection.purchases'), 'add', this.render());
        this.model = new Backbone.Collection();
        this.model.reset(collect);
        this.headerInfo.expenses = RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth();
        this.headerInfo.month = this.application.displayedDate.format('MMMM');
        this.headerInfo.year = this.application.displayedDate.format('YYYY');
        this.changeModel(this.model);
    },

    showChartExpenses: function () {
        'use strict';
        this.application.showChartExpenses();
    },


    previousMonth: function () {
        'use strict';
        this.application.changeMonth(-1, this);
    },

    nextMonth: function () {
        'use strict';
        this.application.changeMonth(1, this);
    }



}));