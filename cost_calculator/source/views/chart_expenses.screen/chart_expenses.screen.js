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
    $chart: null,

    onInitialize: function () {
        'use strict';
        this.application.loadCategories();
        this.$chart = $(document.createElement('div'));
        this.$chart.addClass('ct-chart');
        this.$legend = $(document.createElement('div'));
        this.$legend.addClass('chart-legend');
    },

    onEndRender: function () {
        'use strict';
        this.$wrapper = $('.wrapper');
        this.$wrapper.append(this.$chart);
    },

    onStartAttach: function () {
        'use strict';
        this.init();
    },

    onEndAttach: function () {
        'use strict';
        var self = this;
        this.init();

        $(window).resize(function () {
            self.changeChartDisposition();
        });
    },

    onEndDetach: function () {
        'use strict';
        $(window).off('resize');
    },

    init: function () {
        'use strict';
        this.changeChartDisposition();
        this.headerInfo.expenses = RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth();
        this.headerInfo.month = this.application.displayedDate.format('MMMM');
        this.headerInfo.year = this.application.displayedDate.format('YYYY');
        this.render();
        this.drawChart();// поместить в onEndRender...

    },

    previousMonth: function () {
        'use strict';
        this.application.changeMonth(-1, this.init.bind(this));
    },

    nextMonth: function () {
        'use strict';
        this.application.changeMonth(1, this.init.bind(this));
    },

    toExpensesPage: function () {
        'use strict';
        this.application.backToExpenses();
    },

    changeChartDisposition: function () {
        'use strict';
        if (window.screen.width > window.screen.height) {
            this.$chart.addClass('ct-chart-landscape');
            this.$legend.addClass('chart-legend-landscape');
        } else {
            this.$chart.removeClass('ct-chart-landscape');
            this.$legend.removeClass('chart-legend-landscape');
        }
    },

    drawChart: function () {
        'use strict';
        var div, span, br,
            arrOfExpenses = RAD.model('collection.purchases').getArrayOfExpensesFromCurrentMonth(),
            data = {
                series: []
            };

        var sum = function (a, b) {
            return a + b;
        };

        this.$legend.empty();

        for (var i = 0, k = 0; i < arrOfExpenses.length; i++) {
            if (arrOfExpenses[i].value !== 0) {
                data.series.push(arrOfExpenses[i].value);
                div = document.createElement('div');
                span = document.createElement('span');
                br = document.createElement('br');
                div.setAttribute('class', 'square');
                div.setAttribute('id', 'ct-legend-' + k);
                span.innerHTML = RAD.model('collection.categories').getCategoryById(arrOfExpenses[i].id);
                this.$legend.append(div);
                this.$legend.append(span);
                this.$legend.append(br);
                k++;
            }
        }

        var options = {
            labelInterpolationFnc: function (value) {
                return Math.round(value / data.series.reduce(sum) * 100) + '%';
            }
        };

        new Chartist.Pie('.ct-chart', data, options);
        this.$wrapper.append(this.$legend);
    }

}));