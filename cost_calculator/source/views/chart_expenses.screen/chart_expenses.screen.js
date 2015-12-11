/*global  Chartist*/
RAD.view('chart_expenses.screen', RAD.Blanks.View.extend({

    url: 'source/views/chart_expenses.screen/chart_expenses.screen.html',

    headerInfo: {
        month: null,
        year: null,
        expenses: null
    },

    onInitialize: function () {
        'use strict';
      //  this.model = RAD.model('collection.purchases').getResultsFromCurrentMonth();
        this.application.loadCategories();
        this.headerInfo.expenses = RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth();
        this.headerInfo.month = this.application.displayedDate.format('MMMM');
        this.headerInfo.year = this.application.displayedDate.format('YYYY');
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

        var options = {
            width: currentInnerWeight,
            height: currentInnerHeight,
            labelInterpolationFnc: function (value) {
                return Math.round(value / data.series.reduce(sum) * 100) + '%';
            }
        };

        new Chartist.Pie('.ct-chart', data, options);

        function calculateCurrentInnerSizes() {
            currentInnerHeight = window.innerHeight;
            currentInnerWeight = window.innerWidth;
        }
    }

}));