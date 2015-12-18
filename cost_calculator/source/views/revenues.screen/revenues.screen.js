RAD.view('revenues.screen', RAD.Blanks.ScrollableView.extend({

    url: 'source/views/revenues.screen/revenues.screen.html',

    headerInfo: {
        month: null,
        year: null,
        revenues: null
    },

    events: {
        'tap #chart': 'showChartRevenues',
        'tap #month-minus': 'previousMonth',
        'tap #month-plus': 'nextMonth',
        'tap #to-home-page': 'toHomePage',
        'tap #to-add-revenues-page': 'toAddRevenuesPage'
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
        this.headerInfo.revenues = RAD.model('collection.purchases').getCommonRevenuesFromCurrentMonth();
        this.headerInfo.month = this.application.displayedDate.format('MMMM');
        this.headerInfo.year = this.application.displayedDate.format('YYYY');
        this.changeModel(this.model);
    },

    showChartRevenues: function () {
        'use strict';
        this.application.showChartRevenues();
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

    toAddRevenuesPage: function () {
        'use strict';
        this.application.showAddRevenues();
    }
}));