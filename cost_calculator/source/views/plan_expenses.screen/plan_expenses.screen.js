RAD.view('plan_expenses.screen', RAD.Blanks.View.extend({

    url: 'source/views/plan_expenses.screen/plan_expenses.screen.html',

    events: {
        'tap #to-home-page': 'toHomePage'
    },

    toHomePage: function () {
        'use strict';
        this.application.backToHome();
    }

}));