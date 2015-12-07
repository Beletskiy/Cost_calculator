RAD.application(function (core) {
    var app = this;

    app.start = function () {

        core.startService();
        app.loadHome();
    };

    app.loadHome = function () {
        var options = {
            container_id: '#screen',
            content: 'home.screen',
            animation: 'slide',
            backstack: true
        };
        core.publish('navigation.show', options);
    };

    return app;
}, true);
