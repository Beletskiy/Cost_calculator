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
        'tap #to-add-revenues-page': 'toAddRevenuesPage',
        'tap .settings': 'showConcreteSettings',
        'tap #cancel': 'hideSettings',
        'tap #item-for-remove': 'removeItem'
    },

    onInitialize: function () {
        'use strict';
        this.model = new Backbone.Collection();
        this.listenTo(this.model, 'reset sort', this.render);
        this.baseCollection = RAD.model('collection.purchases');
        this.baseCollection.sortByDate();
        this.listenTo(this.model, 'reset sort', this.render);
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
        var collect = RAD.model('collection.purchases').getResultsFromCurrentMonth();

        this.headerInfo.revenues = RAD.model('collection.purchases').getCommonRevenuesFromCurrentMonth();
        this.headerInfo.month = this.application.displayedDate.format('MMMM');
        this.headerInfo.year = this.application.displayedDate.format('YYYY');
        this.model.reset(collect);
        //this.changeModel(this.model);
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
    }
}));