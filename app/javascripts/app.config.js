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
        }).state('app.doLists', {
            url: 'do-lists',
            templateUrl: './partials/do-lists.html',
            controller: 'DoListsController as doListsCtrl'
        }).state('app.doList', {
            url: 'do-list/:doListId',
            templateUrl: './partials/do-list.html',
            controller: 'DoListController as doListCtrl'
        }).state('app.companies', {
            url: 'companies',
            template: '<h1>Companies</h1>'
        });
    }
})();