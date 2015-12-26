RAD.model('displayedDate.model', Backbone.Model.extend({
    defaults: {
        displayedDate: moment(),
        changeMonth: function (amountOfMonth, callback) {
            'use strict';
            var MAX_AMOUNT = 60,
                MIN_AMOUNT = -60;
            if ((typeof amountOfMonth === 'number') && (amountOfMonth < MAX_AMOUNT) && (amountOfMonth > MIN_AMOUNT)) {
                this.displayedDate = this.displayedDate.add(amountOfMonth, 'months');
            }
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    }
}), true);