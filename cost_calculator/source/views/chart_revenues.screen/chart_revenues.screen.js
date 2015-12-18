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
        this.$legend = document.createElement('div');
        this.$legend.setAttribute('class', 'chart-legend');
    },

    onStartAttach: function () {
        'use strict';
        var self = this;
        this.init();
        $(window).resize(function () {
            self.drawChart();
        });
    },

    onEndDetach: function () {
        'use strict';
        $(window).off('resize');
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
        console.log('draw chart');
        calculateCurrentInnerSizes();
        var currentInnerHeight = 0, currentInnerWeight = 0, div, span, br,
            arrOfExpenses = RAD.model('collection.purchases').getArrayOfRevenuesFromCurrentMonth(),
            data = {
                series: []
            };

        var sum = function (a, b) {
            return a + b;
        };

        while (this.$legend.firstChild) {
            this.$legend.removeChild(this.$legend.firstChild);
        }

        for (var i = 0, k = 0; i < arrOfExpenses.length; i++) {
            if (arrOfExpenses[i].value !== 0) {
                data.series.push(arrOfExpenses[i].value);
                div = document.createElement('div');
                span = document.createElement('span');
                br = document.createElement('br');
                div.setAttribute('class', 'square');
                div.setAttribute('id', 'ct-legend-' + k);
                span.innerHTML = RAD.model('collection.categories').getCategoryById(arrOfExpenses[i].id);
                this.$legend.appendChild(div);
                this.$legend.appendChild(span);
                this.$legend.appendChild(br);
                k++;
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
        $('.wrapper').append(this.$legend);

        function calculateCurrentInnerSizes() {
            currentInnerHeight = window.innerHeight;
            currentInnerWeight = window.innerWidth;
        }
    }

}));