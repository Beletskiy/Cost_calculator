RAD.view('balance.screen', RAD.Blanks.ScrollableView.extend({

    url: 'source/views/balance.screen/balance.screen.html',
    headerInfo: {
        month: null,
        year: null,
        balance: null
    },

    events: {
        'tap #chart': 'showChartBalance',
        'tap #month-minus': 'previousMonth',
        'tap #month-plus': 'nextMonth',
        'tap #to-home-page': 'toHomePage'
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
        this.headerInfo.balance = RAD.model('collection.purchases').getCommonRevenuesFromCurrentMonth() -
            RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth();
        this.headerInfo.month = this.application.displayedDate.format('MMMM');
        this.headerInfo.year = this.application.displayedDate.format('YYYY');
        this.changeModel(this.model);
    },

    showChartBalance: function () {
        'use strict';
        this.application.showChartBalance();
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
    }

}));