(function (document, window) {
    // don't remove ## marks, CLI uses them for updating this file
    // #script_begin#
    'use strict';
    var scripts = [

        'source/models/categories.collection/categories.collection.js',

        'source/models/purchases.collection/purchases.collection.js',

        'source/service/service.json_loader/service.json_loader.js',
        
        'source/views/home.screen/home.screen.js',

        'source/views/add_expenses.screen/add_expenses.screen.js',

        'source/views/add_revenues.screen/add_revenues.screen.js',

        'source/views/chart_expenses.screen/chart_expenses.screen.js',

        'source/views/chart_balance.screen/chart_balance.screen.js',

        'source/views/expenses.screen/expenses.screen.js',

        'source/views/revenues.screen/revenues.screen.js',

        'source/views/balance.screen/balance.screen.js',

        'source/application/application.js'
    ];
    // #script_end#
    function onEndLoad() {

        var core = window.RAD.core,
            application = window.RAD.application,
            coreOptions = {
                defaultBackstack: false,
                defaultAnimation: 'slide',
                animationTimeout: 3000,
                debug: false
            };

        //initialize core by new application object
        core.initialize(application, coreOptions);

        //start
        application.start();
    }

    window.RAD.scriptLoader.loadScripts(scripts, onEndLoad);
}(document, window));