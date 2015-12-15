/* global moment */
RAD.view('home.screen', RAD.Blanks.View.extend({

    url: 'source/views/home.screen/home.screen.html',

    events: {
        'tap #add-expenses, #total-expenses, #add-revenues, #total-revenues, #total-balance': 'onButtonClick',
        'tap #month-minus': 'previousMonth',
        'tap #month-plus': 'nextMonth',
        'fling #date': 'swipe'
    },

    headerInfo: {
        month: null,
        year: null,
        expenses: null,
        revenues: null
    },

    onInitialize: function () {
        'use strict';
        // console.log('from init home');
        var now = moment();
        this.application.displayedDate = now;
        this.headerInfo.month = now.format('MMMM');
        this.headerInfo.year = now.format('YYYY');
        this.headerInfo.expenses = RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth();
        this.headerInfo.revenues = RAD.model('collection.purchases').getCommonRevenuesFromCurrentMonth();
    },

    onNewExtras: function () {
        'use strict';
        // console.log('from extras home');
        this.headerInfo.month = this.application.displayedDate.format('MMMM');
        this.headerInfo.year = this.application.displayedDate.format('YYYY');
        this.headerInfo.expenses = RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth();
        this.headerInfo.revenues = RAD.model('collection.purchases').getCommonRevenuesFromCurrentMonth();
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
        }
    },

    previousMonth: function () {
        'use strict';
        this.application.changeMonth(-1, this);
    },

    nextMonth: function () {
        'use strict';
        this.application.changeMonth(1, this);
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