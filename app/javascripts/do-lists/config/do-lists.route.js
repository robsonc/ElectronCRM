(function() {
    'use strict';

    angular.module('bs.dolists').config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider){
        //your config goes here
        $stateProvider.state('app.doLists', {
            url: 'do-lists',
            templateUrl: './javascripts/do-lists/partials/do-lists.html',
            controller: 'DoListsController as doListsCtrl'
        }).state('app.doList', {
            url: 'do-list/:doListId',
            templateUrl: './javascripts/do-lists/partials/do-list.html',
            controller: 'DoListController as doListCtrl'
        }).state('app.doListSettings', {
            url: 'do-list-settings/:doListId',
            templateUrl: './javascripts/do-lists/partials/do-list-settings.html',
            controller: 'DoListSettingsController as doListSettingsCtrl',
            resolve: {
                doList: ['$stateParams', 'DoListService', function($stateParams, DoListService){
                    return DoListService.findById($stateParams.doListId).then(function(doList){
                        return doList;
                    });
                }]
            }
        });
    }
})();