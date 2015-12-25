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
        this.baseCollection = RAD.model('collection.purchases');
        this.listenTo(this.model, 'reset sort', this.render);
        //this.baseCollection.listenTo(this.baseCollection, 'remove', this.render); don't work correctly
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
        var collect = this.baseCollection.getResultsFromCurrentMonth();
        this.headerInfo.balance = this.baseCollection.getCommonRevenuesFromCurrentMonth() -
            this.baseCollection.getCommonExpensesFromCurrentMonth();
        this.headerInfo.month = this.application.displayedDate.format('MMMM');
        this.headerInfo.year = this.application.displayedDate.format('YYYY');
        this.model.reset(collect);
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
    },

    hideSettings: function () {
        'use strict';
        this.$menu.removeClass('menu--open');
    },

    removeItem: function () {
        'use strict';
        this.baseCollection.remove(this.baseCollection.where({id: this.itemForRemove}));
        this.init();
    },

    toHomePage: function () {
        'use strict';
        this.application.backToHome();
    }

}));