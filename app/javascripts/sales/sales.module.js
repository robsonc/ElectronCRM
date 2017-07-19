(function() {
    'use strict';

    //entities
    var Sale = require('./../../models/sale');
    var Product = require('./../../models/product');

    angular.module('bs.sales', ['ui.router']);
    angular.module('bs.sales')
        .constant('Sale', Sale)
        .constant('Product', Product);
})();