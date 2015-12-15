/*global  Chartist*/
RAD.view('chart_expenses.screen', RAD.Blanks.View.extend({

    url: 'source/views/chart_expenses.screen/chart_expenses.screen.html',

    headerInfo: {
        month: null,
        year: null,
        expenses: null
    },

    events: {
        'tap #month-minus': 'previousMonth',
        'tap #month-plus': 'nextMonth'
    },

    onInitialize: function () {
        'use strict';
        this.application.loadCategories();
        this.headerInfo.expenses = RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth();
        this.headerInfo.month = this.application.displayedDate.format('MMMM');
        this.headerInfo.year = this.application.displayedDate.format('YYYY');
    },

    onNewExtras: function () {
        'use strict';
        this.headerInfo.expenses = RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth();
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
        calculateCurrentInnerSizes();
        var currentInnerHeight = 0, currentInnerWeight = 0,
            data = {
                series: []
            };

        var sum = function (a, b) {
            return a + b;
        };

        data.series = RAD.model('collection.purchases').getArrayOfExpensesFromCurrentMonth();

        if (!data.series.every(allElementsIsNull)) {
            var options = {
                width: currentInnerWeight,
                height: currentInnerHeight,
                labelInterpolationFnc: function (value) {
                    return Math.round(value / data.series.reduce(sum) * 100) + '%';
                }
            };

            new Chartist.Pie('.ct-chart', data, options);
        } else {
            console.log('Can not draw chart');
        }

        function allElementsIsNull(element) {
            return element === 0;
        }

        function calculateCurrentInnerSizes() {
            currentInnerHeight = window.innerHeight;
            currentInnerWeight = window.innerWidth;
        }
    }

}));