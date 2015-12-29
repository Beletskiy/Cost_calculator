RAD.view('chart_expenses.screen', RAD.Blanks.ScrollableView.extend({

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

    onInitialize: function () {
        'use strict';
        this.application.loadCategories();
       // this.listenTo(this.model, 'reset', this.render);
    },

    onEndRender: function () {
        'use strict';
       // this.drawChart();
        //console.log(this.model);
    },

    onStartAttach: function () {
        'use strict';
        this.loadData();// нарисовать график и легенду
    },

    onEndAttach: function () {
        'use strict';
        this.drawChart();
     //   this.init();вызываем метод получения новых данных и сетим их в модель.
    },

    onEndDetach: function () {
        'use strict';
    },

    loadData: function () {
        'use strict';
        var displayedDate = RAD.model('displayedDate.model').attributes.displayedDate;

        this.headerInfo.expenses = RAD.model('collection.purchases').getCommonExpensesFromCurrentMonth();
        this.headerInfo.month = displayedDate.format('MMMM');
        this.headerInfo.year = displayedDate.format('YYYY');
        //this.changeModel(this.model);
        this.drawChart();
        this.render();
    },

    previousMonth: function () {
        'use strict';
        RAD.model('displayedDate.model').attributes.changeMonth(-1, this.loadData.bind(this));
    },

    nextMonth: function () {
        'use strict';
        RAD.model('displayedDate.model').attributes.changeMonth(1, this.loadData.bind(this));
    },

    toExpensesPage: function () {
        'use strict';
        this.application.backToExpenses();
    },

    drawChart: function () {
        'use strict';
        console.log('draw chart');
        var arrOfExpenses = RAD.model('collection.purchases').getArrayOfExpensesFromCurrentMonth(),
            categoryModel = RAD.model('collection.categories'),
            data = {
                series: []
            };

        var sum = function (a, b) {
            return a + b;
        };

        var options = {
            labelInterpolationFnc: function (value) {
                return Math.round(value / data.series.reduce(sum) * 100) + '%';
            }
        };

        this.model = new Backbone.Collection();

        for (var i = 0, k = 0; i < arrOfExpenses.length; i++) {
            if (arrOfExpenses[i].value !== 0) {
                data.series.push(arrOfExpenses[i].value);
                this.model.add({id: k, category: categoryModel.getCategoryById(arrOfExpenses[i].id)});
                k++;
            }
        }
        //console.log(data);
        //console.log(document.getElementsByClassName('ct-chart'));
        new Chartist.Pie('.ct-chart', data, options);
    }

}));