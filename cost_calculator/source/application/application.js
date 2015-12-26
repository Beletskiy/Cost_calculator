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

    app.showAddExpenses = function (viewCameFrom) {
        var options = {
            container_id: '#screen',
            content: 'add_expenses.screen',
            extras: viewCameFrom
        };
        core.publish('navigation.show', options);
    };

    app.showAddRevenues = function (viewCameFrom) {
        var options = {
            container_id: '#screen',
            content: 'add_revenues.screen',
            extras: viewCameFrom
        };
        core.publish('navigation.show', options);
    };

    app.showExpenses = function () {
        var options = {
            container_id: '#screen',
            content: 'expenses.screen'
        };
        core.publish('navigation.show', options);
    };

    app.backToExpenses = function () {
        var options = {
            container_id: '#screen',
            content: 'expenses.screen',
            animation: 'slide-out'
        };
        core.publish('navigation.show', options);
    };

    app.showRevenues = function () {
        var options = {
            container_id: '#screen',
            content: 'revenues.screen'
        };
        core.publish('navigation.show', options);
    };

    app.backToRevenues = function () {
        var options = {
            container_id: '#screen',
            content: 'revenues.screen',
            animation: 'slide-out'
        };
        core.publish('navigation.show', options);
    };

    app.showBalance = function () {
        var options = {
            container_id: '#screen',
            content: 'balance.screen'
        };
        core.publish('navigation.show', options);
    };

    app.backToBalance = function () {
        var options = {
            container_id: '#screen',
            content: 'balance.screen',
            animation: 'slide-out'
        };
        core.publish('navigation.show', options);
    };

    app.showChartExpenses = function () {
        var options = {
            container_id: '#screen',
            content: 'chart_expenses.screen'
        };
        // получить данные для модели графика
        core.publish('navigation.show', options);
    };

    app.showChartRevenues = function () {
        var options = {
            container_id: '#screen',
            content: 'chart_revenues.screen'
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

    app.showPlanExpenses = function () {
        var options = {
            container_id: '#screen',
            content: 'plan_expenses.screen'
        };
        core.publish('navigation.show', options);
    };

    app.showSettings = function () {
        var options = {
            container_id: '#screen',
            content: 'settings.screen'
        };
        core.publish('navigation.show', options);
    };

    app.backToPreviousPage = function (previousPage) {
        var options = {
            container_id: '#screen',
            content: previousPage,
            animation: 'slide-out'
        };
        core.publish('navigation.show', options);
    };

    app.displayedDate = {};

    app.changeMonth = function (amountOfMonth, callback) {
        var MAX_AMOUNT = 60,
            MIN_AMOUNT = -60;
        if ((typeof amountOfMonth === 'number') && (amountOfMonth < MAX_AMOUNT) && (amountOfMonth > MIN_AMOUNT)) {
            this.displayedDate = this.displayedDate.add(amountOfMonth, 'months');
        }
        if (callback && typeof callback === 'function') {
            callback();
        }
    };

    return app;
}, true);
