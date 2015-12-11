/* global moment */
RAD.view('home.screen', RAD.Blanks.View.extend({

    url: 'source/views/home.screen/home.screen.html',

    events: {
        'tap #add-expenses, #total-expenses': 'onButtonClick'
    },

    dateInfo: {
        month: null,
        year: null
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

    onInitialize: function () {
        'use strict';
        var now = moment();
        this.application.displayedDate = now;
        this.dateInfo.month = now.format('MMMM');
        this.dateInfo.year = now.format('YYYY');
    }

}));