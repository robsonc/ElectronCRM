(function(){
    'use strict';

    angular.module('TodoList').config(AppConfig);
    AppConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'ChartJsProvider'];
    function AppConfig($stateProvider, $urlRouterProvider, ChartJsProvider){

        ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', 
            '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('app', {
            url: '/',
            abstract: true,
            views: {
                '': {
                    templateUrl: "./partials/index.html"
                },
                'nav@app': {
                    templateUrl: "./partials/nav.html",
                    controller: "NavController as nav"
                }
            }
        }).state('app.dashboard', {
            url: '',
            templateUrl: './partials/main.html',
            controller: 'MainController as main'
        });
    }
})();