(function() {
    'use strict';

    //entities
    var Product = require('./../../models/product');

    angular.module('bs.products', ['ui.router']);
    angular.module('bs.products')
        .constant('Product', Product);
})();