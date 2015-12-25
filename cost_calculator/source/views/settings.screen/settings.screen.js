RAD.view('settings.screen', RAD.Blanks.View.extend({

    url: 'source/views/settings.screen/settings.screen.html',
    events: {
        'tap #to-home-page': 'toHomePage'
    },

    toHomePage: function () {
        'use strict';
        this.application.backToHome();
    }

}));