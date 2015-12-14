/* global moment */
RAD.view('home.screen', RAD.Blanks.View.extend({

    url: 'source/views/home.screen/home.screen.html',

    events: {
        'tap #add-expenses, #total-expenses': 'onButtonClick',
        'tap #month-minus': 'previousMonth',
        'tap #month-plus': 'nextMonth'
    },

    headerInfo: {
        month: null,
        year: null,
        expenses: null
    },

    onInitialize: function () {
        'use strict';
        console.log('from init home');
        var now = moment();
        this.application.displayedDate = now;
        this.headerInfo.month = now.format('MMMM');
        this.headerInfo.year = now.format('YYYY');
        this.headerInfo.expenses = RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth();
    },

    onNewExtras:function () {
        'use strict';
        console.log('from extras home');
        this.headerInfo.month = this.application.displayedDate.format('MMMM');
        this.headerInfo.year = this.application.displayedDate.format('YYYY');
        this.headerInfo.expenses = RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth();
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
            case 'total-expenses':
                this.application.showExpenses();
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
    }



    //changeMonth: function (e) {
    //    'use strict';
    //    var id = e.currentTarget.getAttribute('id'),
    //        curTime = RAD.application.displayedDate,
    //        curOperation = id.split('-')[1];
    //
    //    if (curOperation === 'minus') {
    //        RAD.application.displayedDate = curTime.subtract(1, 'months');
    //    } else {
    //        RAD.application.displayedDate = curTime.add(1, 'months');
    //    }
    //    this.onNewExtras();
    //}

}));