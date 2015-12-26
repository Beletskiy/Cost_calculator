RAD.view('expenses.screen', RAD.Blanks.View.extend({

    url: 'source/views/expenses.screen/expenses.screen.html',

    headerInfo: {
        month: null,
        year: null,
        expenses: null,
        sortMethod: null
    },

    events: {
        'tap #chart': 'showChartExpenses',
        'tap #month-minus': 'previousMonth',
        'tap #month-plus': 'nextMonth',
        'tap #to-home-page': 'toHomePage',
        'tap #to-add-expenses-page': 'toAddExpensesPage',
        'tap #expenses-type': 'sortCollection',
        'tap .settings': 'showConcreteSettings',
        'tap #cancel, .menu__overlay': 'hideSettings',
        'tap #item-for-remove': 'removeItem'
    },

   EXPENSES_BY_DATE: 'expenses by date',
   EXPENSES_BY_CATEGORY: 'expenses by category',
   EXPENSES_BY_AMOUNT: 'expenses by amount',

    onInitialize: function () {
        'use strict';
        this.model = new Backbone.Collection();
        this.baseCollection = RAD.model('collection.purchases');
        this.baseCollection.sortByDate();
        this.headerInfo.sortMethod = this.EXPENSES_BY_DATE;
        this.tapNumber = 1;

        this.listenTo(this.model, 'reset sort', this.render);
    },

    onEndRender: function () {
        'use strict';
        this.$menu = this.$('.menu');
    },

    onStartAttach: function () {
        'use strict';
        this.loadData();
    },

    loadData: function () {
        'use strict';
        var collect = this.baseCollection.getResultsFromCurrentMonth(),
            displayedDate = RAD.model('displayedDate.model').attributes.displayedDate;

        this.headerInfo.expenses = this.baseCollection.getCommonExpensesFromCurrentMonth();
        this.headerInfo.month = displayedDate.format('MMMM');
        this.headerInfo.year = displayedDate.format('YYYY');
        this.model.reset(collect);
    },

    showChartExpenses: function () {
        'use strict';
        this.application.showChartExpenses();
    },


    previousMonth: function () {
        'use strict';
        RAD.model('displayedDate.model').attributes.changeMonth(-1, this.loadData.bind(this));
    },

    nextMonth: function () {
        'use strict';
        RAD.model('displayedDate.model').attributes.changeMonth(1, this.loadData.bind(this));
    },

    toHomePage: function () {
        'use strict';
        this.application.backToHome();
    },

    toAddExpensesPage: function () {
        'use strict';
        this.application.showAddExpenses(this.viewID);
    },

    calculateTapNumber: function () {
        'use strict';
        this.tapNumber++;
            if (this.tapNumber > 3) {
                this.tapNumber = 1;
            }
        return this.tapNumber;
    },

    showConcreteSettings: function (e) {
        'use strict';
        this.$menu.addClass('menu--open');
        this.itemForRemove = e.currentTarget.id;
    },

    hideSettings: function () {
        'use strict';
        this.$menu.removeClass('menu--open');
    },

    removeItem: function () {
        'use strict';
        this.baseCollection.remove(this.baseCollection.where({id: this.itemForRemove}));
        this.loadData();
    },

    sortCollection: function () {
        'use strict';
        var collect,
            tapNumber;

        tapNumber = this.calculateTapNumber();

        if (tapNumber === 2) {
            this.baseCollection.sortByCategory();
            collect = this.baseCollection.getResultsFromCurrentMonth();
            this.headerInfo.sortMethod = this.EXPENSES_BY_CATEGORY;
            this.model.reset(collect);
        }
        if (tapNumber === 3) {
            this.baseCollection.sortBySum();
            collect = this.baseCollection.getResultsFromCurrentMonth();
            this.headerInfo.sortMethod = this.EXPENSES_BY_AMOUNT;
            this.model.reset(collect);
        }
        if (tapNumber === 1) {
            this.baseCollection.sortByDate();
            collect = this.baseCollection.getResultsFromCurrentMonth();
            this.headerInfo.sortMethod = this.EXPENSES_BY_DATE;
            this.model.reset(collect);
        }
    }
}));