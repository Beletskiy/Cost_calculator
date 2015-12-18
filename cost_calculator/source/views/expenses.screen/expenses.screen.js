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
        'tap #month-plus': 'nextMonth',
        'tap #to-home-page': 'toHomePage',
        'tap #to-add-expenses-page': 'toAddExpensesPage',
        'change #expenses-type': 'changeExpenses'
    },

    onInitialize: function () {
        'use strict';
        this.model = new Backbone.Collection();
    },

    onStartAttach: function () {
        'use strict';
        this.init();
    },

    init: function () {
        'use strict';
        var collect = RAD.model('collection.purchases').getResultsFromCurrentMonth();

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
        this.application.changeMonth(-1, this.init.bind(this));
    },

    nextMonth: function () {
        'use strict';
        this.application.changeMonth(1, this.init.bind(this));
    },

    toHomePage: function () {
        'use strict';
        this.application.backToHome();
    },

    toAddExpensesPage: function () {
        'use strict';
        this.application.showAddExpenses();
    },

    changeExpenses: function () {
        'use strict';
        console.log('onchange');
        console.log(this.$('#expenses-type option:selected').data('id'));
    }
}));