/*global  Chartist*/
RAD.view('chart_balance.screen', RAD.Blanks.View.extend({

    url: 'source/views/chart_balance.screen/chart_balance.screen.html',
    headerInfo: {
        month: null,
        year: null,
        balance: null
    },

    events: {
        'tap #month-minus': 'previousMonth',
        'tap #month-plus': 'nextMonth'
    },

    currentRevenues: RAD.model('collection.purchases').getCommonRevenuesFromCurrentMonth(),
    currentExpenses: RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth(),

    onInitialize: function () {
        'use strict';
        this.application.loadCategories();
        this.headerInfo.balance = this.currentRevenues - this.currentExpenses;
        this.headerInfo.month = this.application.displayedDate.format('MMMM');
        this.headerInfo.year = this.application.displayedDate.format('YYYY');
    },

    onNewExtras: function () {
        'use strict';
        this.currentRevenues = RAD.model('collection.purchases').getCommonRevenuesFromCurrentMonth();
        this.currentExpenses = RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth();
        this.headerInfo.balance = this.currentRevenues - this.currentExpenses;
        this.headerInfo.month = this.application.displayedDate.format('MMMM');
        this.headerInfo.year = this.application.displayedDate.format('YYYY');
        this.render();
        this.drawChart();
    },

    onStartAttach: function () {
        'use strict';
        var self = this;
        $(window).resize(function () {
            self.drawChart();
        });
    },

    onEndAttach: function () {
        'use strict';
        this.drawChart();
    },

    onEndDetach: function () {
        'use strict';
        $(window).off('resize');
    },


    previousMonth: function () {
        'use strict';
        this.application.changeMonth(-1, this);
    },

    nextMonth: function () {
        'use strict';
        this.application.changeMonth(1, this);
    },

    drawChart: function () {
        'use strict';
        new Chartist.Bar('.ct-chart', {
            labels: ['expanses', 'revenue'],
            series: [this.currentExpenses, this.currentRevenues]
        }, {
            distributeSeries: true,
            axisX: {
                showGrid: false
            }
        });
    }
}));