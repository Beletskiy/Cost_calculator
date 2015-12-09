RAD.application(function (core) {
    'use strict';
    var app = this;

    app.start = function () {

        core.startService();
        app.loadHome();
    };

    app.loadHome = function () {
        var options = {
            container_id: '#screen',
            content: 'home.screen'
        };
        core.publish('navigation.show', options);
    };

    app.loadCategories = function () {
        core.publish('service.json_loader.get', {
            file: 'jsondata/categories.json',
            //loader: true,
            callback: function (json) {
                RAD.model('collection.categories').add(json, {silent: true});
                RAD.model('collection.categories').trigger('change');
            }
        });
    };

    app.showAddExpenses = function () {
        var options = {
            container_id: '#screen',
            content: 'add_expenses.screen'
        };
        core.publish('navigation.show', options);
    };

    app.showExpenses = function (month, year) {
        var options = {
            container_id: '#screen',
            content: 'expenses.screen',
            extras: {
                month: month,
                year: year
            }
        };
        core.publish('navigation.show', options);
    };

    app.backToThePreviousPage = function () {
        window.history.back();
    };

    app.displayedDate = {
        //month: null,
        //year: null
    };

    return app;
}, true);
