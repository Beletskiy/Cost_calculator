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
        expensesPrevMonth: null,
        revenuesPrevMonth: null
    },

    onInitialize: function () {
        'use strict';
        //var now = RAD.model('displayedDate.model').attributes.displayedDate;
        //
        //this.headerInfo.month = now.format('MMMM');
        //this.headerInfo.year = now.format('YYYY');
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
        var displayedDate = RAD.model('displayedDate.model').attributes.displayedDate;

        this.headerInfo.month = displayedDate.format('MMMM');
        this.headerInfo.year = displayedDate.format('YYYY');
        this.headerInfo.expenses = RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth();
        this.headerInfo.revenues = RAD.model('collection.purchases').getCommonRevenuesFromCurrentMonth();
        this.headerInfo.expensesPrevMonth = RAD.model('collection.purchases').getCommonExpensesFromPreviousMonth(1);
        this.headerInfo.revenuesPrevMonth = RAD.model('collection.purchases').getCommonRevenuesFromPreviousMonth(1);
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
                this.application.showAddExpenses(this.viewID);
                break;
            case 'add-revenues':
                this.application.showAddRevenues(this.viewID);
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
        RAD.model('displayedDate.model').attributes.changeMonth(-1, this.loadData.bind(this));
    },

    nextMonth: function () {
        'use strict';
        RAD.model('displayedDate.model').attributes.changeMonth(1, this.loadData.bind(this));
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