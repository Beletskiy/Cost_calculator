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

    app.backToHome = function () {
        var options = {
            container_id: '#screen',
            content: 'home.screen',
            extras: {},
            animation: 'slide-out'
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

    app.showAddRevenues = function () {
        var options = {
            container_id: '#screen',
            content: 'add_revenues.screen'
        };
        core.publish('navigation.show', options);
    };

    app.showExpenses = function () {
        var options = {
            container_id: '#screen',
            content: 'expenses.screen',
            extras: {}
        };
        core.publish('navigation.show', options);
    };

    app.showRevenues = function () {
        var options = {
            container_id: '#screen',
            content: 'revenues.screen',
            extras: {}
        };
        core.publish('navigation.show', options);
    };

    app.showBalance = function () {
        var options = {
            container_id: '#screen',
            content: 'balance.screen',
            extras: {}
        };
        core.publish('navigation.show', options);
    };

    app.showChartExpenses = function () {
        var options = {
            container_id: '#screen',
            content: 'chart_expenses.screen'
        };
        core.publish('navigation.show', options);
    };

    app.showChartBalance = function () {
        var options = {
            container_id: '#screen',
            content: 'chart_balance.screen'
        };
        core.publish('navigation.show', options);
    };

    app.backToThePreviousPage = function () {
        window.history.back();
    };

    app.displayedDate = {

    };

    app.changeMonth = function (amountOfMonth, view) {
        var MAX_AMOUNT = 60,
            MIN_AMOUNT = -60;
        if ((typeof amountOfMonth === 'number') && (amountOfMonth < MAX_AMOUNT) && (amountOfMonth > MIN_AMOUNT)) {
            this.displayedDate = this.displayedDate.add(amountOfMonth, 'months');
        }
        view.onNewExtras();
    };

    return app;
}, true);
