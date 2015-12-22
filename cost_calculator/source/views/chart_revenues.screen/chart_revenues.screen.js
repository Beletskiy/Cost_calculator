RAD.view('chart_revenues.screen', RAD.Blanks.View.extend({

    url: 'source/views/chart_revenues.screen/chart_revenues.screen.html',
    headerInfo: {
        month: null,
        year: null,
        revenues: null
    },

    events: {
        'tap #month-minus': 'previousMonth',
        'tap #month-plus': 'nextMonth',
        'tap #to-revenues-page': 'toRevenuesPage'
    },

    $legend: null,

    onInitialize: function () {
        'use strict';
        this.application.loadCategories();
        this.$legend = $(document.createElement('div'));
        this.$legend.addClass('chart-legend');
        this.$wrapper = $('.wrapper');
    },

    onEndAttach: function () {
        'use strict';
        this.init();
    },

    init: function () {
        'use strict';
        this.headerInfo.revenues = RAD.model('collection.purchases').getCommonRevenuesFromCurrentMonth();
        this.headerInfo.month = this.application.displayedDate.format('MMMM');
        this.headerInfo.year = this.application.displayedDate.format('YYYY');
        this.render();
        this.drawChart();
    },

    previousMonth: function () {
        'use strict';
        this.application.changeMonth(-1, this.init.bind(this));
    },

    nextMonth: function () {
        'use strict';
        this.application.changeMonth(1, this.init.bind(this));
    },

    toRevenuesPage: function () {
        'use strict';
        this.application.backToRevenues();
    },

    drawChart: function () {
        'use strict';
        var div, span, br,
            arrOfExpenses = RAD.model('collection.purchases').getArrayOfRevenuesFromCurrentMonth(),
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