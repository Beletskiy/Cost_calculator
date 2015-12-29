RAD.view('chart_revenues.screen', RAD.Blanks.ScrollableView.extend({

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
    },

    onEndAttach: function () {
        'use strict';
        this.init();
    },

    init: function () {
        'use strict';
        var displayedDate = RAD.model('displayedDate.model').attributes.displayedDate;

        this.headerInfo.revenues = RAD.model('collection.purchases').getCommonRevenuesFromCurrentMonth();
        this.headerInfo.month = displayedDate.format('MMMM');
        this.headerInfo.year = displayedDate.format('YYYY');
        this.render();
        this.drawChart();
    },

    previousMonth: function () {
        'use strict';
        RAD.model('displayedDate.model').attributes.changeMonth(-1, this.init.bind(this));
    },

    nextMonth: function () {
        'use strict';
        RAD.model('displayedDate.model').attributes.changeMonth(1, this.init.bind(this));
    },

    toRevenuesPage: function () {
        'use strict';
        this.application.backToRevenues();
    },

    drawChart: function () {
        'use strict';
        var arrOfRevenues = RAD.model('collection.purchases').getArrayOfRevenuesFromCurrentMonth(),
            categoryModel = RAD.model('collection.categories'),
            data = {
                series: []
            };

        var sum = function (a, b) {
            return a + b;
        };

        this.model = new Backbone.Collection();

        for (var i = 0, k = 0; i < arrOfRevenues.length; i++) {
            if (arrOfRevenues[i].value !== 0) {
                data.series.push(arrOfRevenues[i].value);
                this.model.add({
                    id: k,
                    category: categoryModel.getCategoryById(arrOfRevenues[i].id)
                });
                k++;
            }
        }

        var options = {
            labelInterpolationFnc: function (value) {
                return Math.round(value / data.series.reduce(sum) * 100) + '%';
            }
        };

        new Chartist.Pie('.ct-chart', data, options);

    }

}));