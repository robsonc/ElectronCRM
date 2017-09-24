(function(){
    'use strict';

    angular.module('TodoList').config(AppConfig);
    AppConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function AppConfig($stateProvider, $urlRouterProvider){

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