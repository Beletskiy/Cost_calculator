/*global moment */
RAD.view('add_expenses.screen', RAD.Blanks.View.extend({

    url: 'source/views/add_expenses.screen/add_expenses.screen.html',

    events: {
        'tap #datetimepicker4': 'onDatetimepicker',
        'tap #add-cost': 'onSubmit',
        'tap input, select, #back-button': 'hideSuccessMessage'
    },

    model: RAD.model('collection.categories'),

    $successMessage: null,
    $formAddCost: null,
    $dateChoose: null,
    $sum: null,
    $costsType: null,

    onInitialize: function () {
        'use strict';
        this.application.loadCategories();
    },

    onEndRender: function () {
        'use strict';
        this.$successMessage = this.$('#success-message');
        this.$formAddCost = this.$('#form-add-cost');
        this.$dateChoose = this.$('#datetimepicker4');
        this.$sum = this.$('#sum');
        this.$costsType = this.$('#costs-type');
    },

    onDatetimepicker: function () {
        'use strict';
        this.$dateChoose.datetimepicker({
            format: 'YYYY-MM-DD'
        });
    },

    onSubmit: function (e) {
        'use strict';
        e.preventDefault();
        var time = this.$dateChoose.val(),
            sum = this.$sum.val(),
            costsType = this.$costsType.val(),
            costsTypeId = this.$('#costs-type option:selected').data('id');
        time = moment(time).format('YYYY-MM-DD');
        if (this.$formAddCost[0].checkValidity()) {
            RAD.model('collection.purchases').add({date: time, category: costsType, sum: sum, categoryId: costsTypeId});
            this.$successMessage.show();
            this.clearForm();
        }
    },

    clearForm: function () {
        'use strict';
        this.$formAddCost[0].reset();

    },

    hideSuccessMessage: function () {
        'use strict';
        this.$successMessage.hide();
    }

}));