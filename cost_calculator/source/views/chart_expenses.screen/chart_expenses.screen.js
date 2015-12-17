RAD.view('chart_expenses.screen', RAD.Blanks.View.extend({

    url: 'source/views/chart_expenses.screen/chart_expenses.screen.html',

    headerInfo: {
        month: null,
        year: null,
        expenses: null
    },

    events: {
        'tap #month-minus': 'previousMonth',
        'tap #month-plus': 'nextMonth',
        'tap #to-expenses-page': 'toExpensesPage'
    },

    $legend: null,

    onInitialize: function () {
        'use strict';
        this.application.loadCategories();
    },

    onNewExtras: function () {
        'use strict';
        this.init();
    },

    onStartAttach: function () {
        'use strict';
        var self = this;
        this.init();
        $(window).resize(function () {
            self.drawChart();
        });
    },

    onEndRender: function () {
        'use strict';
        this.$legend = this.$('.legend');
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

    toExpensesPage: function () {
        'use strict';
        this.application.backToExpenses();
    },

    init: function () {
        'use strict';
        this.headerInfo.expenses = RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth();
        this.headerInfo.month = this.application.displayedDate.format('MMMM');
        this.headerInfo.year = this.application.displayedDate.format('YYYY');
        this.render();
        this.drawChart();
    },

    drawChart: function () {
        'use strict';
        console.log('draw chart');
        calculateCurrentInnerSizes();
        var currentInnerHeight = 0, currentInnerWeight = 0,
            arrOfExpenses = RAD.model('collection.purchases').getArrayOfExpensesFromCurrentMonth(),
            data = {
                series: []
            };

        var sum = function (a, b) {
            return a + b;
        };

        for (var i = 0; i < arrOfExpenses.length; i++) {
            if (arrOfExpenses[i].value !== 0) {
                data.series.push(arrOfExpenses[i].value);
                console.log(RAD.model('collection.categories').getCategoryById(arrOfExpenses[i].id));
                //this.$legend.appendChild();
            }
        }

        var options = {
            width: currentInnerWeight,
            height: currentInnerHeight,
            labelInterpolationFnc: function (value) {
                return Math.round(value / data.series.reduce(sum) * 100) + '%';
            }
        };

        new Chartist.Pie('.ct-chart', data, options);

      // console.log(RAD.model('collection.categories').getCategoryById(1));

        function calculateCurrentInnerSizes() {
            currentInnerHeight = window.innerHeight;
            currentInnerWeight = window.innerWidth;
        }
    }

}));