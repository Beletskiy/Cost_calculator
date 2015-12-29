
RAD.view('chart_balance.screen', RAD.Blanks.View.extend({

    url: 'source/views/chart_balance.screen/chart_balance.screen.html',
    headerInfo: {
        month: null,
        year: null,
        balance: null
    },

    events: {
        'tap #month-minus': 'previousMonth',
        'tap #month-plus': 'nextMonth',
        'tap #to-balance-page': 'toBalancePage'
    },

    onInitialize: function () {
        'use strict';
        this.application.loadCategories();
    },

    onStartAttach: function () {
        'use strict';
        this.loadData();
    },

    onEndDetach: function () {
        'use strict';
    },


    previousMonth: function () {
        'use strict';
        RAD.model('displayedDate.model').attributes.changeMonth(-1, this.loadData.bind(this));
    },

    nextMonth: function () {
        'use strict';
        RAD.model('displayedDate.model').attributes.changeMonth(1, this.loadData.bind(this));
    },

    toBalancePage: function () {
        'use strict';
        this.application.backToBalance();
    },

    loadData: function () {
        'use strict';
        var displayedDate = RAD.model('displayedDate.model').attributes.displayedDate;

        this.currentRevenues = RAD.model('collection.purchases').getCommonRevenuesFromCurrentMonth();
        this.currentExpenses = RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth();
        this.headerInfo.balance = this.currentRevenues - this.currentExpenses;
        this.headerInfo.month = displayedDate.format('MMMM');
        this.headerInfo.year = displayedDate.format('YYYY');
        this.render();
        this.drawChart();
    },

    drawChart: function () {
        'use strict';
        new Chartist.Bar('.ct-chart', {
            labels: ['expanses', 'revenues'],
            series: [this.currentExpenses, this.currentRevenues]
        }, {
            distributeSeries: true,
            axisX: {
                showGrid: false
            }
        });
    }
}));