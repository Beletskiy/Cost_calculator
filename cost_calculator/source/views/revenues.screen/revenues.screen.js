RAD.view('revenues.screen', RAD.Blanks.View.extend({

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
        'tap #cancel, .menu__overlay': 'hideSettings',
        'tap #item-for-remove': 'removeItem'
    },

    onInitialize: function () {
        'use strict';
        this.model = new Backbone.Collection();
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
        this.loadData();
    },

    loadData: function () {
        'use strict';
        var collect = RAD.model('collection.purchases').getResultsFromCurrentMonth(),
            displayedDate = RAD.model('displayedDate.model').attributes.displayedDate;

        this.headerInfo.revenues = RAD.model('collection.purchases').getCommonRevenuesFromCurrentMonth();
        this.headerInfo.month = displayedDate.format('MMMM');
        this.headerInfo.year = displayedDate.format('YYYY');
        this.model.reset(collect);
    },

    showChartRevenues: function () {
        'use strict';
        this.application.showChartRevenues();
    },


    previousMonth: function () {
        'use strict';
        RAD.model('displayedDate.model').attributes.changeMonth(-1, this.loadData.bind(this));
    },

    nextMonth: function () {
        'use strict';
        RAD.model('displayedDate.model').attributes.changeMonth(1, this.loadData.bind(this));
    },

    toHomePage: function () {
        'use strict';
        this.application.backToHome();
    },

    toAddRevenuesPage: function () {
        'use strict';
        this.application.showAddRevenues(this.viewID);
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
        this.loadData();
    }
}));