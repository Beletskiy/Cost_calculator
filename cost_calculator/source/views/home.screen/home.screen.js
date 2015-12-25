RAD.view('home.screen', RAD.Blanks.View.extend({

    url: 'source/views/home.screen/home.screen.html',

    events: {
        'tap #add-expenses, #total-expenses, #add-revenues, #total-revenues, #total-balance, #plan-expenses, #to-settings':
            'onButtonClick',
        'tap #month-minus': 'previousMonth',
        'tap #month-plus': 'nextMonth',
        'tap #settings': 'showSettings',
        'tap #cancel': 'hideSettings',
        'fling #date': 'swipe'
    },

    $menu: null,

    headerInfo: {
        month: null,
        year: null,
        expenses: null,
        revenues: null,
        expensesDiff: null,
        revenuesDiff: null
    },

    onInitialize: function () {
        'use strict';
        var now = moment();
        this.application.displayedDate = now;
        this.headerInfo.month = now.format('MMMM');
        this.headerInfo.year = now.format('YYYY');
    },

    onStartAttach: function () {
        'use strict';
        this.init();
    },

    onEndRender: function () {
        'use strict';
        this.$menu = this.$('.menu');
    },

    init: function () {
        'use strict';
        this.headerInfo.month = this.application.displayedDate.format('MMMM');
        this.headerInfo.year = this.application.displayedDate.format('YYYY');
        this.headerInfo.expenses = RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth();
        this.headerInfo.revenues = RAD.model('collection.purchases').getCommonRevenuesFromCurrentMonth();
        this.headerInfo.expensesDiff = this.headerInfo.expenses -
            RAD.model('collection.purchases').getCommonExpensesFromPreviousMonth(1);
        this.headerInfo.revenuesDiff = this.headerInfo.revenues -
            RAD.model('collection.purchases').getCommonRevenuesFromPreviousMonth(1);
        this.render();
    },

    onButtonClick: function (e) {
        'use strict';
        var id = e.currentTarget.getAttribute('id');
        this.showNextPage(id);
    },

    showNextPage: function (id) {
        'use strict';
        switch (id) {
            case 'add-expenses':
                this.application.showAddExpenses();
                break;
            case 'add-revenues':
                this.application.showAddRevenues();
                break;
            case 'total-expenses':
                this.application.showExpenses();
                break;
            case 'total-revenues':
                this.application.showRevenues();
                break;
            case 'total-balance':
                this.application.showBalance();
                break;
            case 'plan-expenses':
                this.application.showPlanExpenses();
                break;
            case 'to-settings':
                this.application.showSettings();
                break;
        }
    },

    previousMonth: function () {
        'use strict';
        this.application.changeMonth(-1, this.init.bind(this));
    },

    nextMonth: function () {
        'use strict';
        this.application.changeMonth(1, this.init.bind(this));
    },

    showSettings: function (e) {
        'use strict';
        e.stopPropagation();
        this.$menu.addClass('menu--open');
    },

    hideSettings: function (e) {
        'use strict';
        this.$menu.removeClass('menu--open');
    },

    swipe: function (e) {
        'use strict';
        var swipeRight = e.originalEvent.speedX > 0;

        if (swipeRight) {
            this.nextMonth();
        } else {
            this.previousMonth();
        }
    }

}));