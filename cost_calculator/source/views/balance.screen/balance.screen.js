RAD.view('balance.screen', RAD.Blanks.View.extend({

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
        'tap #cancel, .menu__overlay': 'hideSettings',
        'tap #item-for-remove': 'removeItem'
    },

    onInitialize: function () {
        'use strict';
        this.model = new Backbone.Collection();
        this.baseCollection = RAD.model('collection.purchases');
        this.baseCollection.sortByDate();
        //this.listenTo(this.model, 'reset sort', this.render);
        //this.baseCollection.listenTo(this.baseCollection, 'remove', this.render); don't work correctly
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
        var collect = this.baseCollection.getResultsFromCurrentMonth(),
            displayedDate = RAD.model('displayedDate.model').attributes.displayedDate;

        this.headerInfo.balance = this.baseCollection.getCommonRevenuesFromCurrentMonth() -
            this.baseCollection.getCommonExpensesFromCurrentMonth();
        this.headerInfo.month = displayedDate.format('MMMM');
        this.headerInfo.year = displayedDate.format('YYYY');
        this.model.reset(collect);
    },

    showChartBalance: function () {
        'use strict';
        this.application.showChartBalance();
    },

    previousMonth: function () {
        'use strict';
        RAD.model('displayedDate.model').attributes.changeMonth(-1, this.loadData.bind(this));
    },

    nextMonth: function () {
        'use strict';
        RAD.model('displayedDate.model').attributes.changeMonth(1, this.loadData.bind(this));
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