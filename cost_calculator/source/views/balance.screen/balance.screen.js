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
        'tap #to-home-page': 'toHomePage',
        'tap .settings': 'showConcreteSettings',
        'tap #cancel': 'hideSettings',
        'tap #item-for-remove': 'removeItem'
    },

    onInitialize: function () {
        'use strict';
        this.model = new Backbone.Collection();
    },

    onEndRender: function () {
        'use strict';
        this.$menu = this.$('.menu');
    },

    onStartAttach: function () {
        'use strict';
        this.init();
    },

    init: function () {
        'use strict';
        this.collection = RAD.model('collection.purchases').getResultsFromCurrentMonth();

        this.model.reset(this.collection);
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

    showConcreteSettings: function (e) {
        'use strict';
        this.$menu.addClass('menu--open');
        this.itemForRemove = e.currentTarget.id;
        console.log(this.itemForRemove);
    },

    hideSettings: function () {
        'use strict';
        this.$menu.removeClass('menu--open');
    },

    removeItem: function () {
        'use strict';
        console.log(this.collection);
        console.log();
        this.collection.remove(this.collection.models[this.itemForRemove]);
        console.log(this.collection);
        this.render();
    },

    toHomePage: function () {
        'use strict';
        this.application.backToHome();
    }

}));