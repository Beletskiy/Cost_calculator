RAD.view('revenues.screen', RAD.Blanks.ScrollableView.extend({

    url: 'source/views/revenues.screen/revenues.screen.html',

    headerInfo: {
        month: null,
        year: null,
        revenues: null
    },

    events: {
        'tap #chart': 'showChartExpenses',
        'tap #month-minus': 'previousMonth',
        'tap #month-plus': 'nextMonth',
        'tap #to-home-page': 'toHomePage',
        'tap #to-add-revenues-page': 'toAddRevenuesPage'
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
        this.headerInfo.revenues = RAD.model('collection.purchases').getCommonRevenuesFromCurrentMonth();
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
    },

    toHomePage: function () {
        'use strict';
       this.application.backToHome();
    },

    toAddRevenuesPage: function () {
        'use strict';
        this.application.showAddRevenues();
    }
}));