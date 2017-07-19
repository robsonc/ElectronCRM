(function() {
    'use strict';

    angular.module('bs.sales').config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider){
        //your config goes here
        $stateProvider.state('app.sales', {
            url: 'sales',
            templateUrl: './javascripts/sales/partials/sales.html',
            controller: 'SalesController as salesCtrl'
        }).state('app.pos', {
            url: 'pos',
            templateUrl: './javascripts/sales/partials/pos.html',
            controller: 'POSController as POSCtrl'
        });
    }
})();